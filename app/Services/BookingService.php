<?php

namespace App\Services;

use App\Http\GoogleCalendarClient;
use App\Http\Requests\AssignServiceToMemberRequest;
use App\Http\Requests\IndexBookingRequest;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use App\Mail\DeleteBooking;
use App\Mail\NewBooking;
use App\Mail\UpdateBooking;
use App\Models\Booking;
use App\Models\BookingUser;
use App\Models\Contact;
use App\Models\Notification;
use App\Models\Service;
use Auth;
use Carbon\Carbon;
use File;
use Google_Service_Calendar;
use Google_Service_Calendar_Event;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use  Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Spatie\CalendarLinks\Link;
use Webpatser\Uuid\Uuid;

class BookingService
{
    use AuthorizesRequests;

    public static function index(IndexBookingRequest $request)
    {
        $bookings = [];

        $bookings = Booking::with(['service', 'bookingLink', 'bookingUsers.user'])->whereHas('service', function ($service) {
            $service->where('user_id', Auth::user()->id)->orWhereHas('parentService', function ($parentService) {
                $parentService->where('user_id', Auth::user()->id);
            });
        })->orWhereHas('bookingLink', function ($bookingLink) {
            $bookingLink->where('user_id', Auth::user()->id);
        })->has('service')->orHas('bookingLink');

        if ($request->date) {
            $bookings = $bookings->where('date', $request->date);
        } elseif ($request->from && $request->to) {
            $bookings = $bookings->whereBetween('date', [$request->from, $request->to]);
        }
        $bookings = $bookings->with('bookingNote', 'service.assignedServices', 'service.parentService.assignedServices')->orderBy('date', 'DESC');
        if ($request->paginate) {
            $bookings = $bookings->paginate(20);
        } else {
            $bookings = $bookings->get();
        }

        return $bookings;
    }

    public static function show($uuid)
    {
        $booking = Booking::with('service.user', 'bookingUsers.user')->where('uuid', $uuid)->firstOrFail();
        $from = Carbon::parse("$booking->date $booking->start");
        $to = $from->clone()->addMinute($booking->service->duration);
        $link = Link::create($booking->name, $from, $to)
            ->description($booking->service->description);

        $booking->google_link = $link->google();
        $booking->outlook_link = url('/ics?name=' . $booking->name . '&data=' . $link->ics());
        $booking->yahoo_link = $link->yahoo();
        $booking->ical_link = $booking->outlook_link;

        return view('booking', compact('booking'));
    }

    public static function store(StoreBookingRequest $request)
    {
        if (! isValidTimezone($request->timezone)) {
            return abort(403, 'Invalid timezone');
        }

        if ($request->service_id) {
            $service = Service::findOrFail($request->service_id);
        } else {
            $service = Service::where('type', 'default')->where('user_id', Auth::user()->id)->firstOrFail();
        }
        $data = $request->validated();
        $bookings = [];
        $data['uuid'] = (string) Uuid::generate();
        $data['name'] = $data['name'] ?? $service->name;
        $data['service_id'] = $service->id;
        if ($request->meeting_type == 'Zoom') {
            $types = collect($service->types);
            $type = $types->firstWhere('type', 'Zoom');
            if ($type && $type['data']) {
                $data['zoom_link'] = $type['data'];
            }
        }

        $booking = Booking::create($data);
        $bookings[] = $booking;

        if (isset($request->is_recurring) && isset($request->frequency) && isset($request->end_date) && isset($request->days)) {
            $start = Carbon::parse("{$request->date} {$request->start}", $request->timezone);
            $end = $start->copy()->add('minute', $service->duration ?? 30);
            $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            $timeslotDayName = Carbon::parse($request->date, $request->timezone)->format('l');
            $currentDate = Carbon::parse($request->date, $request->timezone)->addDay(1);
            $endDate = Carbon::parse($request->end_date, $request->timezone);
            $weekOfMonth = 0;
            if (isset($request->day_in_month)) {
                switch ($request->day_in_month) {
                    case 'first_week':
                        $weekOfMonth = 1;
                        break;
                    case 'second_week':
                        $weekOfMonth = 2;
                        break;
                    case 'third_week':
                        $weekOfMonth = 3;
                        break;
                    case 'las_week':
                        $weekOfMonth = 4;
                        break;
                }
            }
            while ($currentDate->lessThan($endDate)) {
                $createBooking = false;
                if ($request->frequency == 'week') {
                    $dayIndex = array_search($currentDate->clone()->format('l'), $days);
                    if (in_array($dayIndex, $request->days)) {
                        $createBooking = true;
                    }
                } elseif ($request->frequency == 'month' && isset($request->frequencyday_in_month)) {
                    $dayName = $currentDate->clone()->format('l');
                    if ($dayName == $timeslotDayName && $weekOfMonth == $currentDate->clone()->weekOfMonth) {
                        $createBooking = true;
                    }
                }
                if ($createBooking) {
                    $zoomLink = null;
                    if ($request->meeting_type == 'Zoom') {
                        $types = collect($service->types);
                        $type = $types->firstWhere('type', 'Zoom');
                        if ($type && $type['data']) {
                            $zoomLink = $type['data'];
                        }
                    }
                    $booking = Booking::create([
                        'name' => $data['name'] ?? $service->name,
                        'service_id' => $service->id ?? null,
                        'date' => $currentDate->clone()->format('Y-m-d'),
                        'start' => $start->format('H:i'),
                        'end' => $end->format('H:i'),
                        'meeting_type' => $request->meeting_type,
                        'metadata' => ['phone' => $request->phone, 'skype' => $request->skype],
                        'uuid' => (string) Uuid::generate(),
                        'timezone' => $request->timezone,
                        'zoom_link' => $zoomLink
                    ]);
                    $bookings[] = $booking;
                }
                $currentDate->addDay(1);
            }
        }

        foreach ($bookings as $booking) {
            $from = Carbon::parse("$booking->date $booking->start", $request->timezone);
            $to = $from->clone()->addMinute($booking->service->duration ?? 30);
            $link = Link::create($data['name'], $from, $to)
                ->description($booking->service->description);
            $attendees = [];
            foreach ($data['contact_ids'] as $contactID) {
                $contact = Contact::findOrFail($contactID);
                if (Auth::user()->can('show', $contact)) {
                    BookingUser::create([
                        'booking_id' => $booking->id,
                        'user_id' => $contact->contact_user_id,
                        'guest' => [
                            'email' => $contact->email,
                            'first_name' => $contact->first_name,
                            'last_name' => $contact->last_name
                        ]
                    ]);
                    $attendees[] = ['email' => $contact->contactUser->email];
                }
            }

            $emails = collect($data['emails'])->unique('email');
            foreach ($emails as $emailData) {
                BookingUser::create([
                    'booking_id' => $booking->id,
                    'user_id' => null,
                    'guest' => [
                        'email' => $emailData['email'],
                        'first_name' => $emailData['first_name'],
                        'last_name' => $emailData['last_name'],
                    ]
                ]);
                $attendees[] = ['email' => $emailData['email']];
            }

            // Check if Google Calendar is integrated
            // Create event to selected google calendar with flag to tell it's a telloe booking
            if ($service && $service->coach->google_calendar_token && $service->coach->google_calendar_id) {
                $time = time();
                $GoogleCalendarClient = new GoogleCalendarClient($service->coach);
                $client = $GoogleCalendarClient->client;
                $googleService = new Google_Service_Calendar($client);
                $event = new Google_Service_Calendar_Event([
                    'id' => 'telloebooking' . $booking->id . $time,
                    'summary' => $data['name'],
                    'description' => $booking->service->description,
                    'start' => [
                        'dateTime' => Carbon::parse("$booking->date $booking->start", $request->timezone)->toIso8601String(),
                        'timeZone' => $booking->service->timezone,
                    ],
                    'end' => [
                        'dateTime' => Carbon::parse("$booking->date $booking->end", $request->timezone)->toIso8601String(),
                        'timeZone' => $booking->service->timezone,
                    ],
                    'attendees' => $attendees,
                    'conferenceData' => [
                        'createRequest' => [
                            'requestId' => $time
                        ]
                    ]
                ]);

                $params = [];
                if ($booking->meeting_type == 'Google Meet') {
                    $params = ['conferenceDataVersion' => 1];
                }
                $event = $googleService->events->insert($service->coach->google_calendar_id, $event, $params);
                $booking->update([
                    'google_event_id' => $event->id
                ]);

                if ($booking->meeting_type == 'Google Meet') {
                    $booking->update([
                        'meet_link' => $event->hangoutLink
                    ]);
                }
            }

            $booking->google_link = $link->google();
            $booking->outlook_link = url('/ics?name=' . $data['name'] . '&data=' . $link->ics());
            $booking->yahoo_link = $link->yahoo();
            $booking->ical_link = $booking->outlook_link;
            $booking->load('bookingUsers.user');
        }

        Mail::queue(new NewBooking($bookings, 'serviceUser'));
        foreach ($bookings as $booking) {
            $booking = clone $booking;
            foreach ($booking->bookingUsers as $bookingUser) {
                if ($bookingUser->user_id) {
                    $user_id = $bookingUser->user_id;
                    $description = 'A booking has been placed for your account.';
                    Notification::create([
                        'user_id' => $user_id,
                        'description' => $description,
                        'link' => "/dashboard/calendar?booking=$booking->id"
                    ]);
                }

                $attendeeEmail = $bookingUser->user ? $bookingUser->user->email : (isset($bookingUser->guest['email']) ? $bookingUser->guest['email'] : null);
                if ($attendeeEmail) {
                    Mail::queue(new NewBooking($bookings, 'customer', $attendeeEmail));
                }
            }
        }

        foreach ($bookings as &$booking) {
            $booking->load('bookingUsers.user');
        }

        return response()->json($bookings);
    }

    public static function update($id, UpdateBookingRequest $request)
    {
        $authUser = Auth::user();
        $booking = Booking::findOrFail($id);
        $service = $booking->service;

        $booking->update($request->validated());
        $booking = $booking->fresh();
        $attendees = [];

        // Remove booking users not in array
        $bookingUserIds = BookingUser::whereIn('id', $request->booking_user_ids)->where('booking_id', $booking->id)->get()->pluck('id')->toArray();
        BookingUser::where('booking_id', $booking->id)->whereNotIn('id', $bookingUserIds)->delete();
        $updatedBookingUsers = $booking->fresh()->bookingUsers;
        $newBookingUsers = [];

        foreach ($updatedBookingUsers as $updatedBookingUser) {
            $attendees[] = ['email' => $updatedBookingUser->user->email];
        }

        // Add contact as booking user
        $contacts = Contact::whereIn('id', $request->contact_ids)->where('user_id', $authUser->id)->get();
        foreach ($contacts as $contact) {
            if (Auth::user()->can('show', $contact)) {
                $newBookingUsers[] = BookingUser::create([
                    'booking_id' => $booking->id,
                    'user_id' => $contact->contact_user_id,
                    'guest' => [
                        'email' => $contact->email,
                        'first_name' => $contact->first_name,
                        'last_name' => $contact->last_name
                    ]
                ]);
                $attendees[] = ['email' => $contact->contactUser->email];
            }
        }

        // Add email as booking user
        $emails = collect($request->emails)->unique('email');
        foreach ($emails as $emailData) {
            $newBookingUsers[] = BookingUser::create([
                'booking_id' => $booking->id,
                'user_id' => null,
                'guest' => [
                    'email' => $emailData['email'],
                    'first_name' => $emailData['first_name'],
                    'last_name' => $emailData['last_name'],
                ]
            ]);
            $attendees[] = ['email' => $emailData['email']];
        }

        if ($booking->google_event_id && $service->coach->google_calendar_token && $service->coach->google_calendar_id) {
            $GoogleCalendarClient = new GoogleCalendarClient($service->coach);
            $client = $GoogleCalendarClient->client;
            $googleService = new Google_Service_Calendar($client);

            $event = $googleService->events->get(
                $service->coach->google_calendar_id,
                $booking->google_event_id);

            if ($event) {
                try {
                    $event->start = [
                        'dateTime' => Carbon::parse("$booking->date $booking->start", $request->timezone)->toIso8601String(),
                        'timeZone' => $booking->service->timezone,
                    ];
                    $event->end = [
                        'dateTime' => Carbon::parse("$booking->date $booking->end", $request->timezone)->toIso8601String(),
                        'timeZone' => $booking->service->timezone,
                    ];
                    $event->attendees = $attendees;
                    $googleService->events->update(
                        $service->coach->google_calendar_id, 
                        $booking->google_event_id, 
                        $event
                    );
                } catch (\Exception $e) {
                }
            }
        }

        try {
            Mail::queue(new UpdateBooking($booking, 'client'));
            // Notify existing booking users
            foreach ($updatedBookingUsers as $bookingUser) {
                if ($bookingUser->user_id) {
                    Notification::create([
                        'user_id' => $bookingUser->user_id,
                        'description' => 'A booking for your account has been modified.',
                        'link' => "/dashboard/calendar?booking=$booking->id"
                    ]);
                }
                $attendeeEmail = $bookingUser->user ? $bookingUser->user->email : (isset($bookingUser->guest['email']) ? $bookingUser->guest['email'] : null);
                if ($attendeeEmail) {
                    Mail::queue(new UpdateBooking($booking, 'contact', $attendeeEmail));
                }
            }

            // Notify new booking users
            foreach ($newBookingUsers as $newBookingUser) {
                if ($newBookingUser->user_id) {
                    $user_id = $newBookingUser->user_id;
                    $description = 'A booking has been placed for your account.';
                    Notification::create([
                        'user_id' => $user_id,
                        'description' => $description,
                        'link' => "/dashboard/calendar?booking=$booking->id"
                    ]);
                }

                $attendeeEmail = $newBookingUser->user ? $newBookingUser->user->email : (isset($newBookingUser->guest['email']) ? $newBookingUser->guest['email'] : null);
                if ($attendeeEmail) {
                    Mail::queue(new NewBooking([$booking], 'customer', $attendeeEmail));
                }
            }
        } catch (\Exception $e) {
        }

        return response()->json($booking->load('service.user', 'bookingNote', 'service.parentService.assignedServices', 'service.assignedServices', 'bookingUsers.user'));
    }

    public static function destroy($id)
    {
        $booking = Booking::where('id', $id)->first();
        (new self)->authorize('delete', $booking);
        try {
            Mail::queue(new DeleteBooking($booking, 'client'));
            Mail::queue(new DeleteBooking($booking, 'contact'));
        } catch (\Exception $e) {
        }
        $booking->delete();
        return $booking->delete();
    }

    public static function downloadIcs(Request $request)
    {
        $base_64_ics = base64_decode(substr($request->data, strpos($request->data, ',') + 1));
        $path = storage_path('app/private/var/tmp/' . Carbon::now()->timestamp . '.ics');
        File::put($path, $base_64_ics);
        return response()->download($path, $request->name . '.ics')->deleteFileAfterSend();
    }

    public static function assignToMember($id, AssignServiceToMemberRequest $request)
    {
        $booking = Booking::findOrfail($id);

        $authUser = Auth::user();
        $service = Service::where('id', $request->service_id)->where('user_id', $authUser->id)->first();
        $assignedService = Service::where('id', $request->service_id)->whereHas('parentService', function ($parentService) use ($authUser) {
            $parentService->where('user_id', $authUser->id);
        })->first();

        if (! $service && ! $assignedService) {
            return abort(403);
        }

        $booking->update([
            'service_id' => $service->id ?? $assignedService->id
        ]);

        return $booking;
    }

    public static function upcoming()
    {
        $authUser = Auth::user();
        $tomorrow = Carbon::now()->addDay(1)->format('Y-m-d');
        $daysAgo = Carbon::now()->subDays(5)->format('Y-m-d');
        $bookings = Booking::with(['service', 'bookingLink', 'bookingUsers.user'])
        ->whereHas('service', function ($service) {
            $service->where('user_id', Auth::user()->id)->orWhereHas('parentService', function ($parentService) {
                $parentService->where('user_id', Auth::user()->id);
            });
        })
        ->orWhereHas('bookingLink', function ($bookingLink) {
            $bookingLink->where('user_id', Auth::user()->id);
        })
        ->orWhereHas('bookingUsers.user', function ($user) use ($authUser) {
            $user->where('id', $authUser->id);
        })
        ->has('service')
        ->orHas('bookingLink')
        ->whereBetween('date', [$daysAgo, $tomorrow])
        ->get();

        return $bookings;
    }

    public static function contactBookings()
    {
        $authUser = Auth::user();
        $bookings = Booking::with(['service', 'bookingLink', 'bookingUsers.user'])
        ->whereHas('bookingUsers.user', function ($user) use ($authUser) {
            $user->where('id', $authUser->id);
        })
        ->has('service')
        ->orHas('bookingLink')
        ->get();

        return $bookings;
    }
}
