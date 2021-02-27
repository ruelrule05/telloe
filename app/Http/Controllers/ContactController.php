<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactCancelSubscriptionRequest;
use App\Http\Requests\ContactCreateInvoiceRequest;
use App\Http\Requests\ContactCreateSubscriptionRequest;
use App\Http\Requests\ContactFinalizeInvoiceRequest;
use App\Http\Requests\ContactGetFromInviteTokenRequest;
use App\Http\Requests\StoreContactRequest;
use App\Models\Contact;
use App\Services\ContactService;
use Illuminate\Http\Request;

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
}
