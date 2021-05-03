<?php

namespace App\Services;

use App\Http\Requests\IndexBookingLinkRequest;
use App\Mail\NewBooking;
use App\Mail\SendBookingLinkInvitation;
use App\Models\Booking;
use App\Models\BookingLink;
use App\Models\BookingLinkContact;
use App\Models\BookingLinkMessage;
use App\Models\Contact;
use Auth;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Mail;
use Spatie\CalendarLinks\Link;
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
        return response($bookingLink->load('bookingLinkContacts.contact.contactUser', 'bookingLinkMessages.user'));
    }

    public static function store(Request $request)
    {
        $contacts = [];
        $emails = [];
        foreach ($request->contacts as $requestContact) {
            if (! isset($requestContact['type']) || $requestContact['type'] != 'email') {
                $contact = Contact::findOrFail($requestContact['id']);
                $contact->color = $requestContact['color'] ?? '#3167e3';

                $contacts[] = $contact;
            } else {
                if (isset($requestContact['type']) && $requestContact['type'] == 'email') {
                    $emails[] = [
                        'email' => $requestContact['id'],
                        'timezone' => $requestContact['timezone'],
                        'color' => $requestContact['color'],
                    ];
                }
            }
        }

        $bookingLink = BookingLink::create([
            'name' => $request->name,
            'user_id' => Auth::user()->id,
            'dates' => $request->dates,
            'uuid' => Uuid::generate(),
            'emails' => $emails,
            'duration' => $request->duration,
        ]);

        foreach ($contacts as $contact) {
            BookingLinkContact::create([
                'contact_id' => $contact->id,
                'booking_link_id' => $bookingLink->id,
                'color' => $contact->color
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
        $time = array_column($timeslots, 'time');
        array_multisort($time, SORT_ASC, $timeslots);
        return $timeslots;
    }

    public static function public($uuid, Request $request)
    {
        $bookingLink = BookingLink::where('uuid', $uuid)->with('bookingLinkContacts.contact.contactUser', 'bookingLinkMessages.user')->firstOrFail();
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

    public static function book($uuid, Request $request)
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
            $start = Carbon::parse("{$request->date} {$request->start}");
            $end = $start->copy()->add('minute', $bookingLink->duration);

            $booking = Booking::create([
                'booking_link_id' => $bookingLink->id,
                'date' => $request->date,
                'start' => $start->format('H:i'),
                'end' => $end->format('H:i'),
            ]);

            $link = Link::create($bookingLink->name, $start, $end);
            $booking->google_link = $link->google();
            $booking->outlook_link = url('/ics?name=' . $bookingLink->name . '&data=' . $link->ics());
            $booking->yahoo_link = $link->yahoo();
            $booking->ical_link = $booking->outlook_link;

            //Mail::queue(new NewBooking([$booking], 'customer'));

            return response($booking);
        }
        return abort(403);
    }

    public static function message($id, Request $request)
    {
        $bookingLink = BookingLink::where('id', $id)->firstOrFail();
        $user = Auth::user(); 
        $bookingLinkContact = $bookingLink->whereHas('bookingLinkContacts', function ($bookingLinkContact) use ($user) {
            $bookingLinkContact->whereHas('contact', function ($contact) use ($user) {
                $contact->where('contact_user_id', $user->id);
            });
        })->exists();
        if ($bookingLink->user_id == $user->id || $bookingLinkContact) {
            $bookingLinkMessage = BookingLinkMessage::create([
                'message' => $request->message,
                'timestamp' => $request->timestamp,
                'booking_link_id' => $bookingLink->id,
                'user_id' => $user->id,
            ]);

            return response()->json($bookingLinkMessage->load('user'));
        }
    }
}
