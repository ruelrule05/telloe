<?php

namespace App\Http\Controllers;

use App\Models\BookingLink;
use App\Models\BookingLinkContact;
use App\Models\Contact;
use Auth;
use Illuminate\Http\Request;
use Mail;
use App\Http\Requests\IndexBookingLinkRequest;
use App\Http\Requests\StoreBookingLinkRequest;
use App\Http\Requests\UpdateBookingLinkRequest;
use App\Mail\SendBookingLinkInvitation;
use App\Services\BookingLinkService;
use Webpatser\Uuid\Uuid;

class BookingLinkController extends Controller
{
    public function index(Request $request)
    {
        return response(BookingLinkService::index($request));
    }

    public function store(StoreBookingLinkRequest $request)
    {
        $contacts = [];
        $emails = [];
        foreach ($request->contacts as $contact) {
            if (! isset($contact['type']) || $contact['type'] != 'email') {
                $contact = Contact::findOrFail($contact['id']);
                $this->authorize('show', $contact);
                $contacts[] = $contact;
            } else {
                if (isset($contact['type']) && $contact['type'] == 'email') {
                    $emails[] = [
                        'email' => $contact['id'],
                        'timezone' => $contact['timezone'],
                    ];
                }
            }
        }

        $bookingLink = BookingLink::create([
            'name' => $request->name,
            'user_id' => Auth::user()->id,
            'dates' => $request->dates,
            'uuid' => Uuid::generate(),
            'emails' => $emails
        ]);

        foreach ($contacts as $contact) {
            BookingLinkContact::create([
                'contact_id' => $contact->id,
                'booking_link_id' => $bookingLink->id
            ]);
        }

        return response($bookingLink->fresh());
    }

    public function show($id)
    {
        $bookingLink = BookingLink::findOrFail($id);
        $this->authorize('show', $bookingLink);
        return response($bookingLink->load('bookingLinkContacts.contact.contactUser'));
    }

    public function update($id, UpdateBookingLinkRequest $request)
    {
        $bookingLink = BookingLink::findOrFail($id);
        $this->authorize('update', $bookingLink);
        $bookingLink->update([
            'dates' => $request->dates
        ]);
        return response($bookingLink->fresh()->load('bookingLinkContacts.contact.contactUser'));
    }

    public function public($uuid, Request $request)
    {
        return response(BookingLinkService::public($uuid, $request));
    }

    public function getAllTimeslots(IndexBookingLinkRequest $request)
    {
        return response(BookingLinkService::getAllTimeslots($request));
    }

    public function sendInvitation($id)
    {
        $bookingLink = BookingLink::findOrFail($id);
        foreach ($bookingLink->bookingLinkContacts as $contact) {
            Mail::to($contact->contact->contactUser->email)->queue(new SendBookingLinkInvitation($bookingLink));
        }
        foreach ($bookingLink->emails as $email) {
            Mail::to($email['email'])->queue(new SendBookingLinkInvitation($bookingLink, $email['email']));
        }
        $this->authorize('show', $bookingLink);
    }

    public function destroy($id)
    {
        $bookingLink = BookingLink::findOrFail($id);
        $this->authorize('destroy', $bookingLink);
        return response($bookingLink->delete());
    }
}
