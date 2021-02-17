<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactCancelSubscriptionRequest;
use App\Http\Requests\ContactCreateInvoiceRequest;
use App\Http\Requests\ContactCreateSubscriptionRequest;
use App\Http\Requests\ContactFinalizeInvoiceRequest;
use App\Http\Requests\ContactGetFromInviteTokenRequest;
use App\Http\Requests\StoreContactRequest;
use App\Http\StripeAPI;
use App\Mail\SendInvitation;
use App\Models\Booking;
use App\Models\BookingNote;
use App\Models\Contact;
use App\Models\ContactNote;
use App\Models\Service;
use App\Models\User;
use App\Services\ContactService;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Mail;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        return response(ContactService::index($request));
    }

    public function store(StoreContactRequest $request)
    {
        return ContactService::store($request);
    }

    public function show(Request $request, Contact $contact)
    {
        $this->authorize('show', $contact);
        $order = $request->order ?? 'DESC';
        $authUser = Auth::user();
        $serviceIds = Service::where('user_id', $authUser->id)->orWhereHas('parentService', function ($parentService) use ($authUser) {
            $parentService->where('user_id', $authUser->id);
        })->get()->pluck('id')->toArray();
        if ($request->services) {
            $serviceIdsCopy = $serviceIds;
            $serviceIds = [];
            $filterServiceIds = explode(',', $request->services);
            foreach ($filterServiceIds as $filterServiceId) {
                if (in_array($filterServiceId, $serviceIdsCopy)) {
                    $serviceIds[] = $filterServiceId;
                }
            }
        }
        $now = Carbon::now()->format('Y-m-d H:i');
        $bookings = Booking::with('service.user', 'bookingNote', 'service.parentService.assignedServices', 'service.assignedServices')->where(function ($query) use ($contact) {
            $contact_user_id = $contact->contact_user_id ?? 0;
            $query->where('user_id', $contact_user_id);
        })->whereIn('service_id', $serviceIds);
        $upcoming_bookings = clone $bookings;
        $contact->upcoming_bookings = $upcoming_bookings->whereDate('date', '>=', $now)->orderBy('date', 'DESC')->limit(5)->get();
        $contact->bookings = $bookings->orderBy('date', $order)->paginate(10);
        return response($contact->load('contactUser'));
    }

    public function update(Request $request, Contact $contact)
    {
        $this->authorize('update', $contact);
        $contact->update($request->only('first_name', 'last_name', 'email', 'blacklisted_services', 'custom_fields'));
        return response($contact->load('contactUser'));
    }

    public function destroy(Contact $contact)
    {
        $this->authorize('delete', $contact);
        return response()->json(['deleted' => $contact->delete()]);
    }

    public function createInvoice($id, ContactCreateInvoiceRequest $request)
    {
        // check if Auth::user has external accounts
        $external_account = Auth::user()->stripe_account['external_accounts']['data'][0] ?? false;
        if (! $external_account) {
            return abort(403, 'Please complete your payout information.');
        }

        $contact = Contact::findOrFail($id);
        $this->authorize('create_invoice', $contact);

        $stripe_api = new StripeAPI();

        $servicesNames = [];
        foreach (($request->service_ids ?? []) as $service_id) {
            $service = Service::findOrFail($service_id);
            $this->authorize('create_invoice', $service);
            $servicesNames[] = $service->name;
        }

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

    public function finalizeInvoice($id, ContactFinalizeInvoiceRequest $request)
    {
        $contact = Contact::findOrFail($id)->makeVisible('invoices');
        $this->authorize('finalize_invoice', $contact);

        $stripe_api = new StripeAPI();
        $invoice = $stripe_api->invoice('retrieve', $request->invoice_id, ['stripe_account' => Auth::user()->stripe_account['id']]);
        $invoice->sendInvoice();

        $invoices = $contact->invoices;
        foreach ($invoices as &$in) {
            if ($in['id'] == $invoice->id) {
                $in = $invoice;
                break;
            }
        }
        $contact->update([
            'invoices' => $invoices
        ]);

        $invoice->contact_id = $contact->id;
        return response()->json($invoice);
    }

    public function createSubscription($id, ContactCreateSubscriptionRequest $request)
    {
        $this->validate($request, [
            'services' => 'required|array',
            'date' => 'required|date',
            'recurring_frequency' => 'required|in:week,month,year',
            'duration' => 'required|numeric',
            'duration_frequency' => 'required|in:month,year',
        ]);

        // check if Auth::user has external accounts
        $external_account = Auth::user()->stripe_account['external_accounts']['data'][0] ?? false;
        if (! $external_account) {
            return abort(403, 'Please complete your payout information.');
        }

        $contact = Contact::findOrFail($id);
        $this->authorize('create_subscription', $contact);

        $servicesNames = [];
        $total = 0;
        foreach ($request->services as $s) {
            $service = Service::findOrFail($s['id']);
            $this->authorize('create_subscription', $service);
            $servicesNames[] = "$service->name ({$s['frequency']}/{$s['frequency_interval']})";
            if ($s['rate'] && $s['frequency'] && $s['frequency_interval']) {
                $total += ($s['frequency'] * $s['rate']);
            }
        }

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

    public function cancelSubscription($id, ContactCancelSubscriptionRequest $request)
    {
        $this->validate($request, [
            'subscription_id' => 'required',
        ]);

        // check if Auth::user has external accounts
        $external_account = Auth::user()->stripe_account['external_accounts']['data'][0] ?? false;
        if (! $external_account) {
            return abort(403, 'Please complete your payout information.');
        }

        $contact = Contact::findOrFail($id);
        $this->authorize('cancel_subscription', $contact);
        if (! in_array($request->subscription_id, Arr::pluck($contact->subscriptions, 'id'))) {
            return abort(403, 'Subscription does not exists.');
        }

        $stripe_api = new StripeAPI();
        $subscription = $stripe_api->subscription('cancel', $request->subscription_id, ['stripe_account' => Auth::user()->stripe_account['id']]);
        $contactSubscriptions = $contact->subscriptions;
        foreach ($contactSubscriptions as &$s) {
            if ($s['id'] == $subscription->id) {
                $s = $subscription;
                break;
            }
        }
        $contact->update([
            'subscriptions' => $contactSubscriptions
        ]);

        $subscription->contact_id = $contact->id;
        return response()->json($subscription);
    }

    public function getContactFromInviteToken(ContactGetFromInviteTokenRequest $request)
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
        if (! $contactUser) {
            $authTab = 'signup';
        }

        Mail::to($contact->email)->queue(new SendInvitation($contact, $authTab));
        return response(['success' => true]);
    }

    public function recentNotes($id)
    {
        $contact = Contact::findOrFail($id);
        $this->authorize('show', $contact);

        $authUser = Auth::user();
        $serviceIds = Service::where('user_id', $authUser->id)->orWhereHas('parentService', function ($parentService) use ($authUser) {
            $parentService->where('user_id', $authUser->id);
        })->get()->pluck('id')->toArray();
        $recent_notes = BookingNote::has('booking')->with('booking')->whereHas('booking', function ($booking) use ($serviceIds, $contact) {
            $booking->whereIn('service_id', $serviceIds)->where(function ($query) use ($contact) {
                $query->where('user_id', $contact->contact_user_id)->orWhere('contact_id', $contact->id);
            });
        })->orderBy('created_at', 'DESC')->take(3)->get();

        return response($recent_notes);
    }

    public function contactNotes($id, Request $request)
    {
        $contact = Contact::findOrFail($id);
        $this->authorize('show', $contact);

        $order = $request->order ?? 'desc';
        return response(ContactNote::where('contact_id', $contact->id)->orderBy('created_at', $order)->get());
    }
}
