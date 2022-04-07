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
            if ($contact['email'] && $contact['email'] != $authUser->email) {
                Contact::firstOrCreate(
                    [
                        'email' => $contact['email'],
                        'user_id' => $authUser->id
                    ],
                    [
                        'first_name' => $contact['first_name'] ?? null,
                        'last_name' => $contact['last_name'] ?? null,
                        'tags' => $contact['tags'] ?? null,
                    ]
                );
            }
        }


        return response(true);
    }

    public function videoMessages($id, Request $request)
    {
        return ContactService::videoMessages($id);
    }

    public function getByUrn($urn)
    {
        return ContactService::getByUrn($urn);
    }
}
