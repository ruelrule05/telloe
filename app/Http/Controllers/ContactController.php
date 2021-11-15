<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactCancelSubscriptionRequest;
use App\Http\Requests\ContactCreateInvoiceRequest;
use App\Http\Requests\ContactCreateSubscriptionRequest;
use App\Http\Requests\ContactFinalizeInvoiceRequest;
use App\Http\Requests\ContactGetFromInviteTokenRequest;
use App\Http\Requests\StoreContactRequest;
use App\Mail\SendInvitation;
use App\Models\Contact;
use App\Models\ContactPackage;
use App\Models\Package;
use App\Models\User;
use App\Services\ContactService;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Mail;
use Str;

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
        $contactService = new ContactService();
        return $contactService->show($request, $contact);
    }

    public function update(Request $request, Contact $contact)
    {
        $contactService = new ContactService();
        return $contactService->update($request, $contact);
    }

    public function destroy(Contact $contact)
    {
        $contactService = new ContactService();
        return response($contactService->destroy($contact));
    }

    public function createInvoice($id, ContactCreateInvoiceRequest $request)
    {
        return response(ContactService::createInvoice($id, $request));
    }

    public function finalizeInvoice($id, ContactFinalizeInvoiceRequest $request)
    {
        return response(ContactService::finalizeInvoice($id, $request));
    }

    public function createSubscription($id, ContactCreateSubscriptionRequest $request)
    {
        return response(ContactService::createSubscription($id, $request));
    }

    public function cancelSubscription($id, ContactCancelSubscriptionRequest $request)
    {
        return response(ContactService::cancelSubscription($id, $request));
    }

    public function getContactFromInviteToken(ContactGetFromInviteTokenRequest $request)
    {
        return response(ContactService::getContactFromInviteToken($request));
    }

    public function resend($id)
    {
        $contact = new ContactService();
        return response($contact->resend($id));
    }

    public function recentNotes($id)
    {
        $contactService = new ContactService();
        return response($contactService->recentNotes($id));
    }

    public function contactNotes($id, Request $request)
    {
        $contactService = new ContactService();
        return response($contactService->contactNotes($id, $request));
    }

    public function package($id, Request $request)
    {
        $this->validate($request, [
            'package_id' => 'required|exists:packages,id',
        ]);
        $authUser = Auth::user();
        $contact = Contact::where('id', $id)->where('user_id', $authUser->id)->firstOrfail();
        $package = Package::where('user_id', $authUser->id)->where('id', $request->package_id)->firstOrFail();
        $contactPackages = [];
        foreach ($package->services as $service) {
            $contactPackages[] = ContactPackage::create([
                'package_id' => $package->id,
                'contact_id' => $contact->id,
                'service' => $service
            ])->load('package', 'bookings');
        }

        return response()->json($contactPackages);
    }

    public function deletePackage($id, Request $request)
    {
        $this->validate($request, [
            'package_id' => 'required|exists:contact_packages,id'
        ]);
        $authUser = Auth::user();
        $contact = Contact::where('id', $id)->where('user_id', $authUser->id)->firstOrfail();
        $contactPackage = ContactPackage::where('id', $request->package_id)->where('contact_id', $contact->id)->firstOrFail();
        return response()->json($contactPackage->delete());
    }

    public function updatePackage($id, Request $request)
    {
        $this->validate($request, [
            'contact_package_id' => 'required|exists:contact_packages,id',
        ]);
        $authUser = Auth::user();
        $contact = Contact::where('id', $id)->where('user_id', $authUser->id)->firstOrfail();
        $contactPackage = ContactPackage::where('id', $request->contact_package_id)->where('contact_id', $contact->id)->firstOrFail();
        $service = $contactPackage->service;
        $service['completed'] = $request->completed;
        return response()->json($contactPackage->update([
            'service' => $service
        ]));
    }

    public function bulkStore(Request $request)
    {
        $this->validate($request, [
            'contacts' => 'required|array',
        ]);
        $authUser = Auth::user();
        $contacts = [];
        foreach ($request->contacts as $contact) {
            if ($contact['email']) {
                $contacts[] = [
                    'email' => $contact['email'],
                    'first_name' => $contact['first_name'] ?? null,
                    'last_name' => $contact['last_name'] ?? null,
                ];
            }
        }

        $contactsToAdd = [];
        $contacts = collect($contacts);

        // Remove existing contacts
        $existingContacts = Contact::where('user_id', $authUser->id)->whereIn('email', $contacts->pluck('email')->toArray())->get();
        $contacts = $contacts->filter(function ($contact) use ($existingContacts) {
            return $existingContacts->where('email', $contact['email'])->first() ? false : true;
        });

        // Existing users
        $existingUsers = User::whereIn('email', $contacts->pluck('email'))->get();
        foreach ($existingUsers as $existingUser) {
            $invite_token = Str::random(30);
            while (Contact::where('invite_token', $invite_token)->exists()) {
                $invite_token = Str::random(30);
            }
            $contactsToAdd[] = [
                'user_id' => $authUser->id,
                'contact_user_id' => $existingUser->id,
                'email' => $existingUser->email,
                'first_name' => $existingUser->first_name,
                'last_name' => $existingUser->last_name,
                'is_pending' => true,
                'invite_token' => $invite_token,
                'created_at' => Carbon::now()
            ];
        }
        // Add existing Users
        Contact::insert($contactsToAdd);
        foreach ($contactsToAdd as $contactsToAddEmail) {
            Mail::to($contactsToAddEmail['email'])->queue(new SendInvitation($contactsToAddEmail['invite_token'], 'login'));
        }

        // Remove existing users
        $contactsToAdd = [];
        $contacts = $contacts->filter(function ($contact) use ($existingUsers) {
            return $existingUsers->where('email', $contact['email'])->first() ? false : true;
        });

        foreach ($contacts as $contact) {
            $invite_token = Str::random(30);
            while (Contact::where('invite_token', $invite_token)->exists()) {
                $invite_token = Str::random(30);
            }
            $contactsToAdd[] = [
                'user_id' => $authUser->id,
                'contact_user_id' => null,
                'email' => $contact['email'] ?? null,
                'first_name' => $contact['first_name'] ?? null,
                'last_name' => $contact['last_name'] ?? null,
                'is_pending' => true,
                'invite_token' => $invite_token,
                'created_at' => Carbon::now()
            ];
        }
        // Add non existing users
        Contact::insert($contactsToAdd);
        foreach ($contactsToAdd as $contactsToAddEmail) {
            Mail::to($contactsToAddEmail['email'])->queue(new SendInvitation($contactsToAddEmail['invite_token'], 'signup'));
        }

        return response(true);
    }
}
