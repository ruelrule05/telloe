<?php

namespace App\Services;

use App\Http\Requests\IndexBookingLinkRequest;
use App\Mail\SendBookingLinkInvitation;
use App\Models\BookingLink;
use App\Models\BookingLinkContact;
use App\Models\Contact;
use Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Mail;
use Webpatser\Uuid\Uuid;

class BookingLinkService
{
    use AuthorizesRequests;

    public static function index(Request $request)
    {
        {
            if ($request->paginate) {
                $bookingLinks = Auth::user()->bookingLinks()->with('bookingLinkContacts.contact')->paginate(20);
            } else {
                $bookingLinks = Auth::user()->bookingLinks()->with('bookingLinkContacts.contact')->get();
            }

            return $bookingLinks;
        }
    }

    public function show($id)
    {
        $bookingLink = BookingLink::findOrFail($id);
        $this->authorize('show', $bookingLink);
        return response($bookingLink->load('bookingLinkContacts.contact.contactUser'));
    }

    public static function store(Request $request)
    {
        $contacts = [];
        $emails = [];
        foreach ($request->contacts as $requestContact) {
            if (! isset($requestContact['type']) || $requestContact['type'] != 'email') {
                $contact = Contact::findOrFail($requestContact['id']);

                $contacts[] = $contact;
            } else {
                if (isset($requestContact['type']) && $requestContact['type'] == 'email') {
                    $emails[] = [
                        'email' => $requestContact['id'],
                        'timezone' => $requestContact['timezone'],
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
                'booking_link_id' => $bookingLink->id,
                'color' => $requestContact['color'] ?? '#3167e3'
            ]);
        }

        return $bookingLink->fresh();
    }

    public static function update($id, Request $request)
    {
        $bookingLink = BookingLink::findOrFail($id);

        $bookingLink->update([
            'dates' => $request->dates
        ]);
        return response($bookingLink->fresh()->load('bookingLinkContacts.contact.contactUser'));
    }

    public static function getAllTimeslots(IndexBookingLinkRequest $request)
    {
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

        return $timeslots;
    }

    public static function public($uuid, Request $request)
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
            return view('booking-link', compact('bookingLink', 'user', 'inEmails'));
        }
        return abort(403);
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
        return $bookingLink->delete();
    }
}
