<?php

namespace App\Services;

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
use App\Models\Conversation;
use App\Models\ConversationMember;
use App\Models\Message;
use App\Models\Service;
use App\Models\User;
use Auth;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Mail;

class ContactService
{
    use AuthorizesRequests;

    public static function index(Request $request)
    {
        $query = $request->get('query');
        $contacts = Contact::with('contactUser')
                // ->select(['bookings.*', 'contacts.*'])
                // ->join('bookings', 'contacts.contact_user_id', '=', 'bookings.user_id')
                ->where('contacts.user_id', Auth::user()->id);
        if ($query) {
            $contacts = $contacts->where(function ($q) use ($query) {
                $q->whereHas('contactUser', function ($contactUser) use ($query) {
                    $contactUser->where('first_name', 'LIKE', '%' . $query . '%')
                            ->orWhere('last_name', 'LIKE', '%' . $query . '%')
                            ->orWhere(DB::raw("CONCAT(`first_name`, ' ', `last_name`)"), 'LIKE', '%' . $query . '%')
                            ->orWhere('email', 'LIKE', '%' . $query . '%');
                })->orWhere(function ($q) use ($query) {
                    $q->where('first_name', 'LIKE', '%' . $query . '%')
                            ->orWhere('last_name', 'LIKE', '%' . $query . '%')
                            ->orWhere(DB::raw("CONCAT(`first_name`, ' ', `last_name`)"), 'LIKE', '%' . $query . '%')
                            ->orWhere('email', 'LIKE', '%' . $query . '%');
                });
            });
        }
        $status = ['accepted', 'pending'];
        if (in_array($request->status, $status)) {
            switch ($request->status) {
                    case 'accepted':
                        $contacts = $contacts->where('is_pending', false);
                        break;

                    case 'pending':
                        $contacts = $contacts->where('is_pending', true);
                        break;
                }
        }

        $contacts = $contacts->orderBy('created_at', 'DESC');

        $contacts = $request->nopaginate ? $contacts->get() : $contacts->paginate(20);

        return $contacts ;
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
        $bookings = Booking::with('service.user', 'service.parentService.assignedServices', 'service.assignedServices')->whereHas('bookingUsers', function ($bookingUsers) use ($contact) {
            $bookingUsers->where('user_id', $contact->contact_user_id);
        })->whereIn('service_id', $serviceIds);
        $upcoming_bookings = clone $bookings;
        $contact->upcoming_bookings = $upcoming_bookings->whereDate('date', '>=', $now)->orderBy('date', 'DESC')->limit(5)->get();
        $contact->bookings = $bookings->orderBy('date', $order)->paginate(10);
        return response($contact->load('contactUser', 'contactPackages.package', 'contactPackages.bookings'));
    }

    public static function store(StoreContactRequest $request)
    {
        if ($request->email == Auth::user()->email) {
            return abort(403, "Can't add your own email as contact");
        }

        $authTab = 'login';
        $contactUser = User::where('email', $request->email)->first();
        if (! $contactUser) {
            $authTab = 'signup';
        }

        if ($contactUser && Contact::where('user_id', Auth::user()->id)->where('contact_user_id', $contactUser->id)->first()) {
            return abort(403, 'This contact already exists.');
        }

        $invite_token = '';
        while (true) {
            $invite_token = Str::random(30);
            $exists = Contact::where('invite_token', $invite_token)->first();
            if (! $exists) {
                break;
            }
        }
        if (Contact::where('user_id', Auth::user()->id)->where('email', $request->email)->first()) {
            return abort(403, 'This contact already exists.');
        }
        $contact = Contact::create([
            'user_id' => Auth::user()->id,
            'contact_user_id' => $contactUser->id ?? null,
            'email' => $request->email,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'is_pending' => true,
            'invite_token' => $invite_token,
            'blacklisted_services' => $request->blacklisted_services,
            'tags' => NULL
        ]);
        $contact->load('contactUser');

        $custom_fields = [];
        foreach ($request->custom_fields as $custom_field => $value) {
            if ($value) {
                $custom_fields[] = ['name' => $custom_field, 'value' => $value];
            }
        }

        $createMessage = false;
        if ($contactUser) {
            $conversation = Conversation::where('user_id', Auth::user()->id)->whereHas('members', function ($member) use ($contactUser) {
                $member->where('user_id', $contactUser->id);
            })->has('members', '=', 1)->first();
            if (! $conversation) {
                $createMessage = true;
                $slug = Str::random(32);
                while (Conversation::where('slug', $slug)->exists()) {
                    $slug = Str::random(32);
                }

                $conversation = Conversation::create([
                    'user_id' => Auth::user()->id,
                    'custom_fields' => $custom_fields,
                    // 'contact_id' => $contact->id,
                    'slug' => $slug
                ]);
            }
        } else {
            $createMessage = true;
            $slug = Str::random(32);
            while (Conversation::where('slug', $slug)->exists()) {
                $slug = Str::random(32);
            }

            $conversation = Conversation::create([
                'user_id' => Auth::user()->id,
                // 'contact_id' => $contact->id,
                'custom_fields' => $custom_fields,
                'slug' => $slug
            ]);
        }

        if ($contactUser && ! in_array($contactUser->id, $conversation->members()->pluck('user_id')->toArray())) {
            ConversationMember::firstOrCreate([
                'conversation_id' => $conversation->id,
                'user_id' => $contactUser->id
            ]);
        }

        if ($conversation && $request->invite_message && $createMessage) {
            Message::create([
                'conversation_id' => $conversation->id,
                'user_id' => Auth::user()->id,
                'message' => $request->invite_message,
                'type' => 'text'
            ]);
        }

        if ($request->sendToEmail) {
            Mail::to($contact->email)->queue(new SendInvitation($invite_token, $authTab, $request->invite_message));
        }
        $contact->conversation = $conversation;
        if ($createMessage) {
            $conversation->delete();
        }
        return response()->json($contact->load('contactUser'));
    }

    public function update(Request $request, Contact $contact)
    {
        $this->authorize('update', $contact);
        $contact->update($request->only('first_name', 'last_name', 'email', 'blacklisted_services', 'custom_fields', 'tags'));
        return response($contact->load('contactUser'));
    }

    public function destroy(Contact $contact)
    {
        $this->authorize('delete', $contact);
        return ['deleted' => $contact->delete()];
    }

    public static function createInvoice($id, ContactCreateInvoiceRequest $request)
    {
        // check if Auth::user has external accounts
        $external_account = Auth::user()->stripe_account['external_accounts']['data'][0] ?? false;
        if (! $external_account) {
            return abort(403, 'Please complete your payout information.');
        }

        $contact = Contact::findOrFail($id);

        $stripe_api = new StripeAPI();

        $servicesNames = [];
        foreach (($request->service_ids ?? []) as $service_id) {
            $service = Service::findOrFail($service_id);

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

        return $invoice;
    }

    public static function finalizeInvoice($id, ContactFinalizeInvoiceRequest $request)
    {
        $contact = Contact::findOrFail($id)->makeVisible('invoices');

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
        return $invoice;
    }

    public static function createSubscription($id, ContactCreateSubscriptionRequest $request)
    {
        // check if Auth::user has external accounts
        $external_account = Auth::user()->stripe_account['external_accounts']['data'][0] ?? false;
        if (! $external_account) {
            return abort(403, 'Please complete your payout information.');
        }

        $contact = Contact::findOrFail($id);

        $servicesNames = [];
        $total = 0;
        foreach ($request->services as $s) {
            $service = Service::findOrFail($s['id']);

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
        return $subscription;
    }

    public static function cancelSubscription($id, ContactCancelSubscriptionRequest $request)
    {
        // check if Auth::user has external accounts
        $external_account = Auth::user()->stripe_account['external_accounts']['data'][0] ?? false;
        if (! $external_account) {
            return abort(403, 'Please complete your payout information.');
        }

        $contact = Contact::findOrFail($id);

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
        return $subscription;
    }

    public static function getContactFromInviteToken(ContactGetFromInviteTokenRequest $request)
    {
        $contact = Contact::where('invite_token', $request->invite_token)->where('user_id', Auth::user()->id)->first();
        return $contact;
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

        Mail::to($contact->email)->queue(new SendInvitation($contact->invite_token, $authTab));
        return ['success' => true];
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
                $query->where('user_id', $contact->contact_user_id);
            });
        })->orderBy('created_at', 'DESC')->take(3)->get();

        return $recent_notes;
    }

    public function contactNotes($id, Request $request)
    {
        $contact = Contact::findOrFail($id);
        $this->authorize('show', $contact);

        $order = $request->order ?? 'desc';
        return ContactNote::where('contact_id', $contact->id)->orderBy('created_at', $order)->get();
    }
}
