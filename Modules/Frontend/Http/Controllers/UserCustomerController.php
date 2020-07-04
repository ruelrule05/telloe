<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserCustomer;
use App\Models\Conversation;
use App\Models\ConversationMember;
use App\Models\Service;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Str;
use Mail;
use Modules\Frontend\Mail\SendInvitation;
use App\Http\StripeAPI;
use Carbon\Carbon;

class UserCustomerController extends Controller
{
    public function index()
    {
        $user_customers = UserCustomer::with('customer')
            ->where('user_id', Auth::user()->id)
            ->orderBy('created_at', 'DESC')
            ->get();
        $user_customers = $user_customers->each(function($user_customer) {
            $user_customer->customer->makeVisible('stripe_customer_id');
        });
        return response()->json($user_customers);
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email'
        ]);

        if($request->email == Auth::user()->email) return abort(403, "Can't add your own email as customer");

        $authTab = 'login';
        $customer = User::where('email', $request->email)->first();
        if(!$customer) $authTab = 'signup';

        if($customer && UserCustomer::where('user_id', Auth::user()->id)->where('customer_id', $customer->id)->first()) return abort(403, "This email is already added");

        $invite_token = '';
        while(true) :
            $invite_token = Str::random(30);
            $exists = UserCustomer::where('invite_token', $invite_token)->first();
            if(!$exists) break;
        endwhile;
        if(UserCustomer::where('user_id', Auth::user()->id)->where('email', $request->email)->first()) return abort(403, 'This customer already exists.');
        $user_customer = UserCustomer::create([
            'user_id' => Auth::user()->id,
            'email' => $request->email,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'customer_id' => $customer->id ?? null,
            'is_pending' => true,
            'invite_token' => $invite_token,
            'blacklisted_services' => $request->blacklisted_services
        ]);
        $user_customer->load('customer');

        $custom_fields = [];
        foreach($request->custom_fields as $custom_field => $value) :
            if($value) $custom_fields[] = [ 'name' => $custom_field, 'value' => $value ];
        endforeach;

        if($customer) :
            $conversation = Conversation::whereHas('members', function($member) use ($customer){
                $member->where('user_id', $customer->id);
            })->has('members', '=', 1)->first();
            if(!$conversation) :
                $conversation = Conversation::create([
                    'user_id' => Auth::user()->id,
                    'custom_fields' => $custom_fields,
                ]);
                ConversationMember::firstOrCreate([
                    'conversation_id' => $conversation->id,
                    'user_id' => $customer->id
                ]);
            endif;
        else :
            $conversation = Conversation::create([
                'user_id' => Auth::user()->id,
                'user_customer_id' => $user_customer->id,
                'custom_fields' => $custom_fields,
            ]);
        endif;

        Mail::to($user_customer->email)->queue(new SendInvitation($user_customer, $authTab));
        return response()->json($user_customer);

    }


    public function update(Request $request, UserCustomer $userCustomer)
    {
    }


    public function destroy(UserCustomer $userCustomer)
    {
        $this->authorize('delete', $userCustomer);
        return response()->json(['deleted' => $userCustomer->delete()]);
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

        $userCustomer = UserCustomer::findOrFail($id);
        $this->authorize('create_invoice', $userCustomer);

        $stripe_api = new StripeAPI();

        $servicesNames = [];
        foreach($request->service_ids as $service_id) :
            $service = Service::findOrFail($service_id);
            $this->authorize('create_invoice', $service);
            $servicesNames[] = $service->name;
        endforeach;

        $amount = $request->amount * 100;
        $invoiceItem = $stripe_api->invoiceItem('create', [
            'customer' => $userCustomer->customer->stripe_customer_id,
            'amount' => $amount,
            'currency' => Auth::user()->stripe_account['external_accounts']['data'][0]['currency'],
        ]); 

        $due_date = Carbon::now()->add(7, 'days');
        $data = [
            'auto_advance' => false,
            'customer' => $userCustomer->customer->stripe_customer_id,
            'collection_method' => 'send_invoice',
            'description' => implode(', ', $servicesNames),
            'transfer_data' => [
                'destination' => Auth::user()->stripe_account['id'],
                'amount' => $amount - ($amount * 0.025), // 2.5%
            ],
            'due_date' => $due_date->timestamp,
        ];
        $invoice = $stripe_api->invoice('create', $data);

        $invoices = $userCustomer->invoices;
        $invoices[] = $invoice;
        $userCustomer->update([
            'invoices' => $invoices
        ]);
        $invoice->customer_id = $userCustomer->id;

        return response()->json($invoice);  
    }

    public function finalizeInvoice($id, Request $request)
    {
        $this->validate($request, [
            'invoice_id' => 'required',
        ]);
        $userCustomer = UserCustomer::findOrFail($id)->makeVisible('invoices');
        $this->authorize('finalize_invoice', $userCustomer);

        $stripe_api = new StripeAPI();
        $invoice = $stripe_api->invoice('retrieve', $request->invoice_id);
        $invoice->sendInvoice();

        $invoices = $userCustomer->invoices;
        foreach($invoices as &$in) :
            if($in['id'] == $invoice->id) :
                $in = $invoice;
                break;
            endif;
        endforeach;
        $userCustomer->update([
            'invoices' => $invoices
        ]);

        $invoice->customer_id = $userCustomer->id;
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

        $userCustomer = UserCustomer::findOrFail($id);
        $this->authorize('create_subscription', $userCustomer);

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
            'description' => "Subscription for {$userCustomer->customer->full_name}",
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
            'customer' => $userCustomer->customer->stripe_customer_id,
            'items' => $subscriptionItem,
            'trial_period_days' => 1,
        ];
        $subscription = $stripe_api->subscription('create', $data);


        $subscriptions = $userCustomer->subscriptions;
        $subscriptions[] = $subscription;
        $userCustomer->update([
            'subscriptions' => $subscriptions
        ]);

        $subscription->customer_id = $userCustomer->id;
        return response()->json($subscription);
    }
    
}
