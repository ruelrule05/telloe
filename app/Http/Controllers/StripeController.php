<?php

namespace App\Http\Controllers;

use App\Http\StripeAPI;
use App\Models\Contact;
use App\Models\Service;
use App\Models\StripeSubscription;
use Auth;
use Cache;
use Carbon\Carbon;
use Illuminate\Http\Request;

class StripeController extends Controller
{
    //
    public function invoices()
    {
        $authUser = Auth::user();
        if (! $authUser->stripe_account) {
            return abort(403, 'Payout account not complete');
        }

        $invoices = Cache::remember("{$authUser->id}_stripe_invoices", 43200, function () use ($authUser) {
            $stripe = new StripeAPI();
            return $stripe->invoice('all', null, ['stripe_account' => Auth::user()->stripe_account['id']]);
        });
        return response()->json($invoices);
    }

    public function updateInvoice($id, Request $request)
    {
        $this->validate($request, [
            'action' => 'required'
        ]);
        $stripe = new StripeAPI();
        $invoice = $stripe->invoice('retrieve', $id, ['stripe_account' => Auth::user()->stripe_account['id']]);
        switch ($request->action) {
            case 'send':
                $invoice = $invoice->sendInvoice();
                break;
            case 'void':
                $invoice = $invoice->voidInvoice();
                break;
            case 'uncollectible':
                $invoice = $invoice->markUncollectible();
                break;
            case 'pay':
                $invoice = $invoice->pay();
                break;
            case 'finalize':
                $invoice = $invoice->finalizeInvoice();
                break;
            case 'delete':
                $invoice = $invoice->delete();
                break;
        }
        $authUser = Auth::user();
        Cache::forget("{$authUser->id}_stripe_invoices");
        return $invoice;
    }

    public function storeInvoice(Request $request)
    {
        $this->validate($request, [
            'contact_id' => 'required|exists:contacts,id',
            'service_ids' => 'nullable|array',
            'amount' => 'required|numeric',
            'currency' => 'required|min:3|max:3',
        ]);

        $authUser = Auth::user();
        $contact = Contact::where('id', $request->contact_id)->where('user_id', $authUser->id)->whereNotNull('stripe_customer_id')->firstOrFail();
        Cache::forget("{$authUser->id}_stripe_invoices");
        $stripe = new StripeAPI();
        $amount = $request->amount * 100;
        $invoiceItem = $stripe->invoiceItem('create', [
            'customer' => $contact->stripe_customer_id,
            'amount' => $amount,
            'currency' => $authUser->stripe_account['external_accounts']['data'][0]['currency'],
        ], ['stripe_account' => $authUser->stripe_account['id']]);

        $servicesNames = [];
        foreach ($request->service_ids as $s) {
            $service = Service::where('id', $s)->where('user_id', $authUser->id)->firstOrFail();
            $servicesNames[] = $service->name;
        }

        $due_date = Carbon::now()->add(7, 'days');
        $description = implode(', ', $servicesNames);
        $data = [
            'auto_advance' => false,
            'customer' => $contact->stripe_customer_id,
            'collection_method' => 'send_invoice',
            'description' => $description,
            'application_fee_amount' => $amount * 0.025 * 100,
            'due_date' => $due_date->timestamp,
        ];
        $invoice = $stripe->invoice('create', $data, ['stripe_account' => $authUser->stripe_account['id']]);
        return response()->json($invoice);
    }

    public function subscriptions()
    {
        $authUser = Auth::user();
        return response()->json(Auth::user()->stripeSubscriptions->load('contact'));
        // if (! $authUser->stripe_account) {
        //     return abort(403, 'Payout account not complete');
        // }

        // $subscriptions = Cache::remember("{$authUser->id}_stripe_subscriptions", 43200, function () use ($authUser) {
        //     $stripe = new StripeAPI();
        //     return $stripe->subscription('all', null, ['stripe_account' => Auth::user()->stripe_account['id']]);
        // });

        // return response()->json($subscriptions);
    }

    public function storeSubscription(Request $request)
    {
        $this->validate($request, [
            'contact_id' => 'required|exists:contacts,id',
            'service_ids' => 'nullable|array',
            'recurring' => 'required',
            'amount' => 'required|numeric',
        ]);

        $authUser = Auth::user();
        if (! $authUser->stripe_account) {
            return abort(403, 'Payout account not complete');
        }

        $contact = Contact::where('id', $request->contact_id)->where('user_id', $authUser->id)->whereNotNull('stripe_customer_id')->firstOrFail();

        $servicesNames = [];
        $services = [];
        foreach ($request->service_ids as $s) {
            $service = Service::where('id', $s)->where('user_id', $authUser->id)->firstOrFail();
            $servicesNames[] = $service->name;
            $services[] = $service;
        }

        $stripe_api = new StripeAPI();
        $amount = $request->amount * 100;

        // Create product
        $servicesNames = count($servicesNames) > 0 ? implode(', ', $servicesNames) : "Subscription for {$contact->contactUser->full_name}";
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
                'interval' => $request->recurring,
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
        $startDateTimestamp = Carbon::now()->add(15, 'minutes')->timestamp;
        $data = [
            'customer' => $contact->stripe_customer_id,
            'items' => $subscriptionItem,
            'trial_end' => $startDateTimestamp,
        ];
        $subscription = $stripe_api->subscription('create', $data, ['stripe_account' => Auth::user()->stripe_account['id']]);
        // $subscription->date = $request->date;
        // $subscription->services = $request->services;
        // $subscription->duration = $request->duration;
        // $subscription->duration_frequency = $request->duration_frequency;
        // $subscription->services = $servicesNames;
        // $subscriptions = $contact->subscriptions;
        // $subscriptions[] = $subscription;
        // $contact->update([
        //     'subscriptions' => $subscriptions
        // ]);
        $subscription = StripeSubscription::create([
            'user_id' => $authUser->id,
            'contact_id' => $contact->id,
            'subscription_id' => $subscription->id,
            'status' => $subscription->status,
            'amount' => $request->amount,
            'currency' => $currency,
            'interval' => $request->recurring,
            'services' => collect($services)->map(function ($service) {
                return [
                    'id' => $service->id,
                    'name' => $service->name
                ];
            })
        ]);
        return response()->json($subscription->load('contact'));
    }

    public function cancelSubscription($id)
    {
        $stripeSubscription = StripeSubscription::where('id', $id)->where('user_id', Auth::user()->id)->firstOrfail();

        $stripe_api = new StripeAPI();
        $stripe_subscription = $stripe_api->subscription('cancel', $stripeSubscription->subscription_id, ['stripe_account' => Auth::user()->stripe_account['id']]);

        $stripeSubscription->delete();

        return response()->json($stripe_subscription);
    }

    public function countrySpecs()
    {
        // 1209600 = 2 weeks
        $countrySpecs = Cache::remember('stripe_country_specs', 1209600, function () {
            $stripe_api = new StripeAPI();
            return $stripe_api->countrySpecs('all');
        });
        return response()->json($countrySpecs->data ?? []);
    }
}
