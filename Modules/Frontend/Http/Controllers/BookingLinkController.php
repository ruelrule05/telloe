<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BookingLink;
use App\Models\BookingLinkContact;
use App\Models\Contact;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Mail;
use Modules\Frontend\Mail\SendBookingLinkInvitation;
use Webpatser\Uuid\Uuid;

class BookingLinkController extends Controller
{
    public function index(Request $request)
    {
        if ($request->paginate) {
            $bookingLinks = Auth::user()->bookingLinks()->withCount('bookingLinkContacts')->paginate(20);
        } else {
            $bookingLinks = Auth::user()->bookingLinks()->withCount('bookingLinkContacts')->get();
        }

        return response()->json($bookingLinks);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:50',
            'contacts' => 'required|array',
            'dates' => 'required|array',
        ]);

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

    public function update($id, Request $request)
    {
        $this->validate($request, [
            'dates' => 'required|array',
        ]);

        $bookingLink = BookingLink::findOrFail($id);
        $this->authorize('update', $bookingLink);
        $bookingLink->update([
            'dates' => $request->dates
        ]);
        return response($bookingLink->fresh()->load('bookingLinkContacts.contact.contactUser'));
    }

    public function public($uuid, Request $request)
    {
        $bookingLink = BookingLink::where('uuid', $uuid)->with('bookingLinkContacts.contact.contactUser')->firstOrFail();
        $user = Auth::user();
        $email = $user->email ?? $request->email;
        $bookingLinkContact = false;
        if ($user) {
            $bookingLinkContact = $bookingLink->whereHas('bookingLinkContacts', function ($bookingLinkContact) use ($user) {
                $bookingLinkContact->whereHas('contact', function ($contact) use ($user) {
                    $contact->where('contact_user_id', $user->id);
                });
            })->exists();
        }
        $inEmails = in_array($email, Arr::pluck($bookingLink->emails, 'email'));
        if ($email == $bookingLink->user->email || $inEmails || $bookingLinkContact) {
            return view('frontend::booking-link', compact('bookingLink', 'user', 'inEmails'));
        }
        return abort(403);
    }

    public function getAllTimeslots(Request $request)
    {
        $this->validate($request, [
            'date' => 'required|date'
        ]);

        $allTimeslots = [];
        $services = Auth::user()->services()->where('is_available', true)->get();
        foreach ($services as $service) {
            $serviceTimeslots = $service->timeslots($request->date);
            foreach ($serviceTimeslots as $serviceTimeslot) {
                if (! isset($allTimeslots[$serviceTimeslot['label']]) || ! $serviceTimeslot['is_available']) {
                    $allTimeslots[$serviceTimeslot['label']] = $serviceTimeslot;
                }
            }
        }

        $timeslots = [];
        foreach ($allTimeslots as $key => $timeslot) {
            $timeslots[] = $timeslot;
        }

        return response($timeslots);
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
