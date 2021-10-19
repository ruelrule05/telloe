<?php

namespace App\Services;

use App\Http\Requests\IndexBookingLinkRequest;
use App\Mail\NewBooking;
use App\Mail\SendBookingLinkInvitation;
use App\Models\Booking;
use App\Models\BookingLink;
use App\Models\BookingLinkContact;
use App\Models\BookingLinkMessage;
use App\Models\BookingUser;
use App\Models\Contact;
use Auth;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Mail;
use Spatie\CalendarLinks\Link;
use Str;
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
            $time = time();
            if (! isset($requestContact['type']) || $requestContact['type'] != 'email') {
                $contact = Contact::findOrFail($requestContact['id']);
                $contact->color = $requestContact['color'] ?? '#3167e3';

                $contacts[] = $contact;
            } else {
                if (isset($requestContact['type']) && $requestContact['type'] == 'email') {
                    $emails[] = [
                        'id' => Str::random(8) . $time,
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
            'message' => $request->message
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
        if ($bookingLink->is_booked) {
            return abort(403, 'Booking link is already booked.');
        }

        $bookingLink->update([
            'dates' => $request->dates,
            'selected_timeslots' => count($request->selected_timeslots) > 0 ? $request->selected_timeslots : null,
        ]);
        return response($bookingLink->fresh()->load('bookingLinkContacts.contact.contactUser'));
    }

    public static function getAllTimeslots(IndexBookingLinkRequest $request)
    {
        $authUser = Auth::user();
        $allTimeslots = [];
        $services = $authUser->services()->with('user')->where('is_available', true)->get();
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
        $bookingLink = BookingLink::with('user')->where('uuid', $uuid)->with('bookingLinkContacts.contact.contactUser', 'bookingLinkMessages.user')->firstOrFail();
        $user = Auth::user();
        $email = $user->email ?? $request->email;
        $bookingLinkContact = false;
        $bookingLinkContact = $bookingLink->bookingLinkContacts()->whereHas('contact', function ($contact) use ($email) {
            $contact->where('email', $email);
        })->first();
        $inEmails = in_array($email, Arr::pluck($bookingLink->emails, 'email'));
        $authAction = 'signup';
        if ($bookingLinkContact && $bookingLinkContact->contact->contact_user_id) {
            $authAction = 'login';
        }
        if ($user) {
            $authAction = null;
        }
        if ($email == $bookingLink->user->email || $inEmails || $bookingLinkContact) {
            return view('booking-link', compact('bookingLink', 'user', 'inEmails', 'authAction'));
        }
        if ($user && ! $inEmails) {
            return abort(403);
        }
        $authAction = 'login';
        return view('booking-link', compact('bookingLink', 'user', 'inEmails', 'authAction'));
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
        $bookingLink = BookingLink::where('uuid', $uuid)->with('bookingLinkContacts.contact.contactUser')->where('is_booked', false)->firstOrFail();
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
                'name' => $bookingLink->name,
                'booking_link_id' => $bookingLink->id,
                'date' => $request->date,
                'start' => $start->format('H:i'),
                'end' => $end->format('H:i'),
                'meeting_type' => 'Custom Link'
            ]);
            $bookingLink->bookingLinkContacts->each(function ($bookingLinkContact) use ($booking) {
                BookingUser::create([
                    'booking_id' => $booking->id,
                    'user_id' => $bookingLinkContact->contact->contact_user_id
                ]);
            });
            collect($bookingLink->emails)->each(function ($email) use ($booking) {
                BookingUser::create([
                    'booking_id' => $booking->id,
                    'guest' => ['email' => $email]
                ]);
            });

            $link = Link::create($bookingLink->name, $start, $end);
            $booking->google_link = $link->google();
            $booking->outlook_link = url('/ics?name=' . $bookingLink->name . '&data=' . $link->ics());
            $booking->yahoo_link = $link->yahoo();
            $booking->ical_link = $booking->outlook_link;
            $bookingLink->update([
                'is_booked' => true
            ]);

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

    public static function associateUser($uuid)
    {
        $authUser = Auth::user();
        $bookingLink = BookingLink::where('uuid', $uuid)->firstOrFail();

        if (! in_array($authUser->email, Arr::pluck($bookingLink->emails, 'email'))) {
            return abort(403);
        }
        $newEmails = [];
        $emails = collect($bookingLink->emails);
        $emailUser = $emails->firstWhere('email', $authUser->email);
        foreach ($bookingLink->emails as $bookingEmail) {
            if ($bookingEmail['email'] != $authUser->email) {
                $newEmails[] = $bookingEmail;
            }
        }
        $bookingLink->emails = $newEmails;
        $bookingLink->save();

        $contact = $bookingLink->bookingLinkContacts()->whereHas('contact.contactUser', function ($user) use ($authUser) {
            $user->where('id', $authUser->id);
        })->exists();
        if (! $contact) {
            $contact = Contact::create([
                'first_name' => $authUser->first_name,
                'last_name' => $authUser->last_name,
                'email' => $authUser->email,
                'contact_user_id' => $authUser->id,
                'user_id' => $bookingLink->user_id,
                'is_pending' => false
            ]);
            BookingLinkContact::create([
                'booking_link_id' => $bookingLink->id,
                'contact_id' => $contact->id,
                'color' => $emailUser['color']
            ]);
        }
    }
}
