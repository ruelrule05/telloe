<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Contact;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\ConversationMember;
use App\Models\Service;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Str;
use Mail;
use Modules\Frontend\Mail\SendInvitation;
use App\Http\StripeAPI;
use Carbon\Carbon;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $contacts = Contact::with('contactUser')
            ->where('user_id', Auth::user()->id)
            ->orderBy('created_at', 'DESC')
            ->get();
        $contacts = $contacts->each(function($contact) {
            $contact->contactUser->makeVisible('stripe_customer_id');
        });

        $contacts = [];
        $query = $request->get('query');
        $contacts = Contact::with('contactUser')
            ->where('user_id', Auth::user()->id)
            ->orderBy('created_at', 'DESC');
        if($query):
            $contacts = $contacts->whereHas('contactUser', function($contactUser) use ($query) {
                $contactuser->where('LIKE', '%' . $query. '%');
            });
        endif;
        $contacts = $contacts->get();
        $contacts = $contacts->each(function($contact) {
            $contact->contactUser->makeVisible('stripe_customer_id');
        });


        return response()->json($contacts);
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'invite_message' => 'nullable|string|max:100',
            'conversation_message' => 'nullable|string|max:255',
        ]);

        if($request->email == Auth::user()->email) return abort(403, "Can't add your own email as contact");

        $authTab = 'login';
        $contactUser = User::where('email', $request->email)->first();
        if(!$contactUser) $authTab = 'signup';

        if($contactUser && Contact::where('user_id', Auth::user()->id)->where('contact_user_id', $contactUser->id)->first()) return abort(403, "This email is already added");

        $invite_token = '';
        while(true) :
            $invite_token = Str::random(30);
            $exists = Contact::where('invite_token', $invite_token)->first();
            if(!$exists) break;
        endwhile;
        if(Contact::where('user_id', Auth::user()->id)->where('email', $request->email)->first()) return abort(403, 'This contact already exists.');
        $contact = Contact::create([
            'user_id' => Auth::user()->id,
            'email' => $request->email,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'contact_user_id' => $contactUser->id ?? null,
            'is_pending' => true,
            'invite_token' => $invite_token,
            'blacklisted_services' => $request->blacklisted_services
        ]);
        $contact->load('contactUser');

        $custom_fields = [];
        foreach($request->custom_fields as $custom_field => $value) :
            if($value) $custom_fields[] = [ 'name' => $custom_field, 'value' => $value ];
        endforeach;

        if($contactUser) :
            $conversation = Conversation::whereHas('members', function($member) use ($contactUser){
                $member->where('user_id', $contactUser->id);
            })->has('members', '=', 1)->first();
            if(!$conversation) :
                $conversation = Conversation::create([
                    'user_id' => Auth::user()->id,
                    'custom_fields' => $custom_fields,
                ]);
                ConversationMember::firstOrCreate([
                    'conversation_id' => $conversation->id,
                    'user_id' => $contactUser->id
                ]);
            endif;
        else :
            $conversation = Conversation::create([
                'user_id' => Auth::user()->id,
                'contact_id' => $contact->id,
                'custom_fields' => $custom_fields,
            ]);
        endif;

        if($conversation && $request->conversation_message) :
            Message::create([
                'conversation_id' => $conversation->id,
                'user_id' => Auth::user()->id,
                'message' => $request->conversation_message,
                'type' => 'text'
            ]);
        endif;

        Mail::to($contact->email)->queue(new SendInvitation($contact, $authTab, $request->invite_message));
        $contact->conversation = $conversation;
        return response()->json($contact);

    }


    public function update(Request $request, Contact $contact)
    {
    }


    public function destroy(Contact $contact)
    {
        $this->authorize('delete', $contact);
        return response()->json(['deleted' => $contact->delete()]);
    }

    public function createInvoice($id, Request $request)
    {
        $this->validate($request, [
            'service_ids' => 'required|array',
            'amount' => 'required|numeric',
        ]);

        // check if Auth::user has external accounts
        $external_account =  Auth::user()->stripe_account['external_accounts']['data'][0] ?? false;
        if(!$external_account) return abort(403, 'Please complete your payout information.');

        $contact = Contact::findOrFail($id);
        $this->authorize('create_invoice', $contact);

        $stripe_api = new StripeAPI();

        $servicesNames = [];
        foreach($request->service_ids as $service_id) :
            $service = Service::findOrFail($service_id);
            $this->authorize('create_invoice', $service);
            $servicesNames[] = $service->name;
        endforeach;

        $amount = $request->amount * 100;
        $invoiceItem = $stripe_api->invoiceItem('create', [
            'customer' => $contact->contactUser->stripe_customer_id,
            'amount' => $amount,
            'currency' => Auth::user()->stripe_account['external_accounts']['data'][0]['currency'],
        ]); 

        $due_date = Carbon::now()->add(7, 'days');
        $data = [
            'auto_advance' => false,
            'customer' => $contact->contactUser->stripe_customer_id,
            'collection_method' => 'send_invoice',
            'description' => implode(', ', $servicesNames),
            'application_fee_amount' => $amount * 0.025 * 100,
            'transfer_data' => [
                'destination' => Auth::user()->stripe_account['id'],
            ],
            'due_date' => $due_date->timestamp,
        ];
        $invoice = $stripe_api->invoice('create', $data);

        $invoices = $contact->invoices;
        $invoices[] = $invoice;
        $contact->update([
            'invoices' => $invoices
        ]);
        $invoice->contact_id = $contact->id;

        return response()->json($invoice);  
    }

    public function finalizeInvoice($id, Request $request)
    {
        $this->validate($request, [
            'invoice_id' => 'required',
        ]);
        $contact = Contact::findOrFail($id)->makeVisible('invoices');
        $this->authorize('finalize_invoice', $contact);

        $stripe_api = new StripeAPI();
        $invoice = $stripe_api->invoice('retrieve', $request->invoice_id);
        $invoice->sendInvoice();

        $invoices = $contact->invoices;
        foreach($invoices as &$in) :
            if($in['id'] == $invoice->id) :
                $in = $invoice;
                break;
            endif;
        endforeach;
        $contact->update([
            'invoices' => $invoices
        ]);

        $invoice->contact_id = $contact->id;
        return response()->json($invoice);  
    }

    public function createSubscription($id, Request $request)
    {
        $this->validate($request, [
            'services' => 'required|array',
            'amount' => 'required|numeric',
        ]);

        // check if Auth::user has external accounts
        $external_account =  Auth::user()->stripe_account['external_accounts']['data'][0] ?? false;
        if(!$external_account) return abort(403, 'Please complete your payout information.');

        $contact = Contact::findOrFail($id);
        $this->authorize('create_subscription', $contact);

        $services = [];
        $servicesNames = [];
        foreach($request->services as $s) :
            $service = Service::findOrFail($s['id']);
            $this->authorize('create_subscription', $service);
            $service->bookings_count = $s['bookings_count'];
            $servicesNames[] = "$service->name[{$s['bookings_count']}/month]";
            $services[] = [
                'service_id' => $service->id,
                'bookings_count' => $s['bookings_count']
            ];
        endforeach;


        $stripe_api = new StripeAPI();
        $amount = $request->amount * 100;

        // Create product
        $data = [
            'name' => implode(', ', $servicesNames),
            'description' => "Subscription for {$contact->contactUser->full_name}",
            'active' => true,
        ];
        $product = $stripe_api->product('create', $data);

        // Create price
        $data = [
            'currency' => Auth::user()->stripe_account['external_accounts']['data'][0]['currency'],
            'product' => $product->id,
            'recurring' => [
                'interval' => 'month',
                'interval_count' => 1,
            ],
            'unit_amount' => $amount
        ];
        $price = $stripe_api->price('create', $data);

        // Create subscription
        $subscriptionItem = [[
            'price' => $price->id,
        ]];
        $data = [
            'customer' => $contact->contactUser->stripe_customer_id,
            'items' => $subscriptionItem,
            'trial_period_days' => 1,
        ];
        $subscription = $stripe_api->subscription('create', $data);


        $subscriptions = $contact->subscriptions;
        $subscriptions[] = $subscription;
        $contact->update([
            'subscriptions' => $subscriptions
        ]);

        $subscription->contact_id = $contact->id;
        return response()->json($subscription);
    }
    
}
