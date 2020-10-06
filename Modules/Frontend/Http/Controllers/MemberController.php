<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Contact;
use App\Models\Member;
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
use Illuminate\Support\Arr;

class MemberController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->get('query');
        $members = Member::with('memberUser')
            ->where('user_id', Auth::user()->id)
            ->orderBy('created_at', 'DESC');
        if($query):
            $members = $members->whereHas('memberUser', function($memberUser) use ($query) {
                $memberUser->where('LIKE', '%' . $query. '%');
            });
        endif;
        $members = $members->get();

        return response()->json($members);
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'invite_message' => 'nullable|string',
        ]);

        if($request->email == Auth::user()->email) return abort(403, "Can't add your own email as contact");

        $authTab = 'login';
        $contactUser = User::where('email', $request->email)->first();
        if(!$contactUser) $authTab = 'signup';

        if($contactUser && Contact::where('user_id', Auth::user()->id)->where('contact_user_id', $contactUser->id)->first()) return abort(403, "This contact already exists.");

        $invite_token = '';
        while(true) :
            $invite_token = Str::random(30);
            $exists = Contact::where('invite_token', $invite_token)->first();
            if(!$exists) break;
        endwhile;
        if(Contact::where('user_id', Auth::user()->id)->where('email', $request->email)->first()) return abort(403, 'This contact already exists.');
        $contact = Contact::create([
            'user_id' => Auth::user()->id,
            'contact_user_id' => $contactUser->id ?? null,
            'email' => $request->email,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'is_pending' => true,
            'invite_token' => $invite_token,
            'blacklisted_services' => $request->blacklisted_services
        ]);
        $contact->load('contactUser');

        $custom_fields = [];
        foreach($request->custom_fields as $custom_field => $value) :
            if($value) $custom_fields[] = [ 'name' => $custom_field, 'value' => $value ];
        endforeach;

        $createMessage = false;
        if($contactUser) :
            $conversation = Conversation::where('user_id', Auth::user()->id)->whereHas('members', function($member) use ($contactUser){
                $member->where('user_id', $contactUser->id);
            })->has('members', '=', 1)->first();
            if(!$conversation) :
                $createMessage = true;
                $conversation = Conversation::create([
                    'user_id' => Auth::user()->id,
                    'custom_fields' => $custom_fields,
                    'contact_id' => $contact->id,
                ]);
            endif;
        else :
            $createMessage = true;
            $conversation = Conversation::create([
                'user_id' => Auth::user()->id,
                'contact_id' => $contact->id,
                'custom_fields' => $custom_fields,
            ]);
        endif;

        if($contactUser && !in_array($contactUser->id, $conversation->members()->pluck('user_id')->toArray())) :
            ConversationMember::firstOrCreate([
                'conversation_id' => $conversation->id,
                'user_id' => $contactUser->id
            ]);
        endif;

        if($conversation && $request->invite_message && $createMessage) :
            Message::create([
                'conversation_id' => $conversation->id,
                'user_id' => Auth::user()->id,
                'message' => $request->invite_message,
                'type' => 'text'
            ]);
        endif;

        if($request->sendToEmail) Mail::to($contact->email)->queue(new SendInvitation($contact, $authTab, $request->invite_message));
        $contact->conversation = $conversation;
        if($createMessage) :
            $conversation->delete();
        endif;
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
            'service_ids' => 'nullable|array',
            'amount' => 'required|numeric',
        ]);

        // check if Auth::user has external accounts
        $external_account =  Auth::user()->stripe_account['external_accounts']['data'][0] ?? false;
        if(!$external_account) return abort(403, 'Please complete your payout information.');

        $contact = Contact::findOrFail($id);
        $this->authorize('create_invoice', $contact);

        $stripe_api = new StripeAPI();

        $servicesNames = [];
        foreach(($request->service_ids ?? []) as $service_id) :
            $service = Service::findOrFail($service_id);
            $this->authorize('create_invoice', $service);
            $servicesNames[] = $service->name;
        endforeach;

        $amount = $request->amount * 100;
        $invoiceItem = $stripe_api->invoiceItem('create', [
            'customer' => $contact->stripe_customer_id,
            'amount' => $amount,
            'currency' => Auth::user()->stripe_account['external_accounts']['data'][0]['currency'],
        ], ['stripe_account' => Auth::user()->stripe_account['id']]); 

        $due_date = Carbon::now()->add(7, 'days');
        $description = implode(', ', $servicesNames);
        $data = [
            'auto_advance' => false,
            'customer' => $contact->stripe_customer_id,
            'collection_method' => 'send_invoice',
            'description' => $description,
            'application_fee_amount' => $amount * 0.025 * 100,
            /*'transfer_data' => [
                'destination' => Auth::user()->stripe_account['id'],
            ],*/
            'due_date' => $due_date->timestamp,
        ];
        $invoice = $stripe_api->invoice('create', $data, ['stripe_account' => Auth::user()->stripe_account['id']]);

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
        $invoice = $stripe_api->invoice('retrieve', $request->invoice_id, ['stripe_account' => Auth::user()->stripe_account['id']]);
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
            'date' => 'required|date',
            'recurring_frequency' => 'required|in:week,month,year',
            'duration' => 'required|numeric',
            'duration_frequency' => 'required|in:month,year',
        ]);

        // check if Auth::user has external accounts
        $external_account =  Auth::user()->stripe_account['external_accounts']['data'][0] ?? false;
        if(!$external_account) return abort(403, 'Please complete your payout information.');

        $contact = Contact::findOrFail($id);
        $this->authorize('create_subscription', $contact);

        $servicesNames = [];
        $total = 0;
        foreach($request->services as $s) :
            $service = Service::findOrFail($s['id']);
            $this->authorize('create_subscription', $service);
            $servicesNames[] = "$service->name ({$s['frequency']}/{$s['frequency_interval']})";
            if($s['rate'] && $s['frequency'] && $s['frequency_interval']) :
                $total += ($s['frequency'] * $s['rate']);
            endif;
        endforeach;

        $stripe_api = new StripeAPI();
        $amount = $total * 100;

        // Create product
        $servicesNames = implode(', ', $servicesNames);
        $data = [
            'name' => $servicesNames,
            'description' => "Subscription for {$contact->contactUser->full_name}",
            'active' => true,
        ];
        $product = $stripe_api->product('create', $data, ['stripe_account' => Auth::user()->stripe_account['id']]);

        // Create price
        $currency = Auth::user()->stripe_account['external_accounts']['data'][0]['currency'];
        $data = [
            'currency' => $currency,
            'product' => $product->id,
            'recurring' => [
                'interval' => $request->recurring_frequency,
                'interval_count' => 1,
            ],
            'unit_amount' => $amount
        ];
        $price = $stripe_api->price('create', $data, ['stripe_account' => Auth::user()->stripe_account['id']]);

        // Create subscription
        $subscriptionItem = [[
            'price' => $price->id,
        ]];

        $now = Carbon::now();
        $startDateTimestamp = Carbon::parse($request->date)->timestamp;

        $data = [
            'customer' => $contact->stripe_customer_id,
            'items' => $subscriptionItem,
            'trial_end' => $startDateTimestamp, // trial_end => timestamp
        ];
        $subscription = $stripe_api->subscription('create', $data, ['stripe_account' => Auth::user()->stripe_account['id']]);
        $subscription->date = $request->date;
        $subscription->services = $request->services;
        $subscription->duration = $request->duration;
        $subscription->duration_frequency = $request->duration_frequency;
        $subscription->services = $servicesNames;

        $subscriptions = $contact->subscriptions;
        $subscriptions[] = $subscription;
        $contact->update([
            'subscriptions' => $subscriptions
        ]);

        $subscription->contact_id = $contact->id;
        return response()->json($subscription);
    }

    public function cancelSubscription($id, Request $request)
    {
        $this->validate($request, [
            'subscription_id' => 'required',
        ]);

        // check if Auth::user has external accounts
        $external_account =  Auth::user()->stripe_account['external_accounts']['data'][0] ?? false;
        if(!$external_account) return abort(403, 'Please complete your payout information.');

        $contact = Contact::findOrFail($id);
        $this->authorize('cancel_subscription', $contact);
        if(!in_array($request->subscription_id, Arr::pluck($contact->subscriptions, 'id'))) return abort(403, 'Subscription does not exists.');

        $stripe_api = new StripeAPI();
        $subscription = $stripe_api->subscription('cancel', $request->subscription_id, ['stripe_account' => Auth::user()->stripe_account['id']]);
        $contactSubscriptions = $contact->subscriptions;
        foreach($contactSubscriptions as &$s) :
            if($s['id'] == $subscription->id) :
                $s = $subscription;
                break;
            endif;
        endforeach;
        $contact->update([
            'subscriptions' => $contactSubscriptions
        ]);


        $subscription->contact_id = $contact->id;
        return response()->json($subscription);
    }

    public function getContactFromInviteToken(Request $request)
    {
        $this->validate($request, [
            'invite_token' => 'required'
        ]);
        $contact = Contact::where('invite_token', $request->invite_token)->where('user_id', Auth::user()->id)->first();
        return response()->json($contact);
    }

    public function resend($id)
    {
        $contact = Contact::findOrFail($id);
        $this->authorize('show', $contact);

        $authTab = 'login';
        $contactUser = User::where('email', $contact->email)->first();
        if(!$contactUser) $authTab = 'signup';

        Mail::to($contact->email)->queue(new SendInvitation($contact, $authTab));
        return response(['success' => true]);
    }
    
}
