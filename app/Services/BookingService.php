<?php

namespace App\Services;

use App\Http\GoogleCalendarClient;
use App\Http\Requests\AssignServiceToMemberRequest;
use App\Http\Requests\DestroyCalendarRequest;
use App\Http\Requests\IndexBookingRequest;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use App\Http\Requests\UpdateOutlookCalendarEventsRequest;
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

        $from = Carbon::parse("$booking->date $booking->start", $request->timezone);
        $to = $from->clone()->addMinute($booking->service->duration ?? 30);
        $link = Link::create($data['name'], $from, $to)
            ->description($booking->service->description);
        foreach ($booking->bookingUsers as $bookingUser) {
            if ($bookingUser->user_id) {
                $user_id = $bookingUser->user_id;
                $description = 'A booking has been placed for your account.';
                Notification::create([
                    'user_id' => $user_id,
                    'description' => $description,
                    'link' => ''
                ]);
            }
        }

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
        }

        Mail::queue(new NewBooking($bookings, 'serviceUser'));
        foreach ($bookings as &$booking) {
            $booking = $booking->refresh()->load('bookingUsers.user');
            foreach ($booking->bookingUsers as $bookingUser) {
                $email = $bookingUser->user ? $bookingUser->user->email : (isset($bookingUser->guest['email']) ? $bookingUser->guest['email'] : null);
                if ($email) {
                    Mail::queue(new NewBooking($bookings, 'customer', $email));
                }
            }
        }

        return response()->json($bookings);
    }

    public static function update($id, UpdateBookingRequest $request)
    {
        $booking = Booking::findOrfail($id);
        $booking->update($request->validated());

        try {
            Mail::queue(new UpdateBooking($booking, 'client'));
            Mail::queue(new UpdateBooking($booking, 'contact'));
        } catch (\Exception $e) {
        }

        $user_id = null;
        $description = '';
        $link = '';
        $authUser = Auth::user();
        if ($booking->user) {
            if ($authUser->id == $booking->user_id) { // if contact - notify client
                $user_id = $booking->service->user->id;
                $description = "<strong>{$booking->user->full_name}</strong> has modified their booking.";
                $contact = $booking->contact ?? Contact::where('user_id', $booking->service->user_id)->where('contact_user_id', $booking->user_id)->first() ?? null;
                if ($contact) {
                    $link = "/dashboard/contacts/$contact->id";
                }
            } elseif ($authUser->id == $booking->service->user_id || $authUser->id == $booking->service->parentService->user_id) { // if client - notify contact
                $user_id = $booking->user->id;
                $description = 'A booking you made has been modified.';
            }

            Notification::create([
                'user_id' => $user_id,
                'description' => $description,
                'link' => $link
            ]);
        }

        return response()->json($booking->load('service.user', 'bookingNote', 'service.parentService.assignedServices', 'service.assignedServices'));
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

    public static function removeCalendar(DestroyCalendarRequest $request)
    {
        $user = Auth::user();

        switch ($request->calendar) {
            case 'google':
                $GoogleCalendarClient = new GoogleCalendarClient($user);
        $client = $GoogleCalendarClient->client;
        $service = new Google_Service_Calendar($client);

        $calendarId = Auth::user()->google_calendar_id;
        // booking events from previous calendar
        if ($calendarId) {
            $calendarEvents = $service->events->listEvents($calendarId, ['privateExtendedProperty' => 'booking=yes']);
            while (true) {
                foreach ($calendarEvents->getItems() as $event) {
                    $evId = $event->getId();
                    $service->events->delete($calendarId, $evId);
                }
                $pageToken = $calendarEvents->getNextPageToken();
                if ($pageToken) {
                    $optParams = ['pageToken' => $pageToken];
                    $calendarEvents = $service->events->listEvents('primary', $optParams);
                } else {
                    break;
                }
            }
        }

        $user->google_calendar_token = null;
        $user->google_calendars = null;
        $user->google_calendar_id = null;
        $user->google_calendar_events = null;
        $user->save();
        break;

        case 'outlook':
                $extensionName = config('oauth.graph_extension_name');
        $OutlookClient = new \App\Http\OutlookClient();
        $graph = new \Microsoft\Graph\Graph();
        $graph->setAccessToken($OutlookClient->accessToken);

        $calendarId = Auth::user()->outlook_calendar_id;
        if ($calendarId) {
            $getOldEventsUrl = "/me/calendars/$calendarId/events?\$filter=extensions/any(f:f/id eq '$extensionName')";
            $eventsList = $graph->createRequest('GET', $getOldEventsUrl)
                      ->setReturnType(\Microsoft\Graph\Model\Event::class)
                      ->execute();

            foreach ($eventsList as $event) {
                $graph->createRequest('DELETE', "/me/calendars/{$calendarId}/events/{$event->getId()}")->execute();
            }
        }

        $user->outlook_token = null;
        $user->outlook_calendars = null;
        $user->outlook_calendar_id = null;
        $user->outlook_calendar_events = null;
        $user->save();
        break;
        }

        return ['success' => true];
    }

    public static function outlookCalendarEvents(Request $request)
    {
        $events = [];
        $extensionName = config('oauth.graph_extension_name');
        $calendarId = Auth::user()->outlook_calendar_id;
        if ($calendarId) {
            $OutlookClient = new \App\Http\OutlookClient();
            $graph = new \Microsoft\Graph\Graph();
            $graph->setAccessToken($OutlookClient->accessToken);

            $getEventsUrl = "/me/calendars/$calendarId/events";
            try {
                $eventsList = $graph->createRequest('GET', $getEventsUrl)
                    ->setReturnType(\Microsoft\Graph\Model\Event::class)
                    ->execute();
                foreach ($eventsList as $event) {
                    $eventExtensionName = '';
                    $getExtensionUrl = "/me/calendars/$calendarId/events/{$event->getId()}/extensions/$extensionName";
                    try {
                        $eventExtension = $graph->createRequest('GET', $getExtensionUrl)
                            ->setReturnType(\Microsoft\Graph\Model\Extension::class)
                            ->execute();
                        $eventExtensionName = $eventExtension->getProperties()['extensionName'];
                    } catch (\Exception $e) {
                    }

                    if ($eventExtensionName != $extensionName) {
                        $events[] = $event;
                    }
                }
            } catch (\Exception $e) {
                //echo $e->getResponse()->getBody()->getContents();
            }
        }

        $user = Auth::user();
        $user->outlook_calendar_events = $events;
        $user->save();

        return response()->json($events);
    }

    public static function outlookCalendarList(Request $request)
    {
        $calendars = [];
        $OutlookClient = new \App\Http\OutlookClient();
        $graph = new \Microsoft\Graph\Graph();
        if ($OutlookClient->accessToken) {
            $graph->setAccessToken($OutlookClient->accessToken);

            $getCalendarsUrl = '/me/calendars';
            $calendars = $graph->createRequest('GET', $getCalendarsUrl)
              ->setReturnType(\Microsoft\Graph\Model\Calendar::class)
              ->execute();

            $user = Auth::user();
            $user->outlook_calendars = $calendars;
            $user->save();
        }

        return $calendars;
    }

    public static function downloadIcs(Request $request)
    {
        $base_64_ics = base64_decode(substr($request->data, strpos($request->data, ',') + 1));
        $path = storage_path('app/private/var/tmp/' . Carbon::now()->timestamp . '.ics');
        File::put($path, $base_64_ics);
        return response()->download($path, $request->name . '.ics')->deleteFileAfterSend();
    }

    public static function updateOutlookCalendarEvents(UpdateOutlookCalendarEventsRequest $request)
    {
        $extensionName = config('oauth.graph_extension_name');

        $OutlookClient = new \App\Http\OutlookClient();
        $graph = new \Microsoft\Graph\Graph();
        $graph->setAccessToken($OutlookClient->accessToken);

        $events = [];
        $oldCalendarId = Auth::user()->outlook_calendar_id;
        $calendarId = $request->outlook_calendar_id;

        $user = Auth::user();
        $user->outlook_calendar_id = $calendarId;
        $user->save();

        // delete booking events from previous calendar
        if ($oldCalendarId) {
            //$getOldEventsUrl = "/me/calendars/$oldCalendarId/events?\$filter=extensions/any(f:f/id eq '$extensionName')";
            $getOldEventsUrl = "/me/calendars/$oldCalendarId/events?\$filter=extensions/any(f:f/id eq '$extensionName')";
            $eventsList = $graph->createRequest('GET', $getOldEventsUrl)
              ->setReturnType(\Microsoft\Graph\Model\Event::class)
              ->execute();

            foreach ($eventsList as $event) {
                $graph->createRequest('DELETE', "/me/calendars/{$calendarId}/events/{$event->getId()}")->execute();
            }
        }

        // delete existing events
        $getExistingEventsUrl = "/me/calendars/$calendarId/events?\$filter=extensions/any(f:f/id eq '$extensionName')";
        $eventsList = $graph->createRequest('GET', $getExistingEventsUrl)
          ->setReturnType(\Microsoft\Graph\Model\Event::class)
          ->execute();
        foreach ($eventsList as $event) {
            $graph->createRequest('DELETE', "/me/calendars/{$calendarId}/events/{$event->getId()}")->execute();
        }

        $bookings = Booking::whereHas('service', function ($service) {
            $service->where('user_id', Auth::user()->id);
        })->get();

        foreach ($bookings as $booking) {
            $event = [
                'Subject' => $booking->service->name,
                'Body' => [
                    'ContentType' => 'HTML',
                    'Content' => $booking->service->description
                ],
                'Start' => [
                    'DateTime' => Carbon::parse("$booking->date $booking->start")->format('Y-m-d\TH:m:s'),
                    'TimeZone' => $booking->service->user->timezone,
                ],
                'End' => [
                    'DateTime' => Carbon::parse("$booking->date $booking->end")->format('Y-m-d\TH:m:s'),
                    'TimeZone' => $booking->service->user->timezone,
                ],
                'isReminderOn' => false,
                'Attendees' => [
                    ['EmailAddress' => [
                        'Address' => $booking->user->email,
                        'Name' => $booking->user->full_name,
                    ]
                    ],
                    ['EmailAddress' => [
                        'Address' => $booking->service->user->email,
                        'Name' => $booking->service->user->full_name,
                    ]
                    ],
                ],
                'Extensions' => [[
                    '@odata.type' => 'microsoft.graph.openTypeExtension',
                    'ExtensionName' => $extensionName
                ]]
            ];

            try {
                $event = $graph->createRequest('POST', "/me/calendars/$calendarId/events")
                    ->attachBody($event)
                    ->setReturnType(\Microsoft\Graph\Model\Event::class)
                    ->execute();
                $events[] = $event;
            } catch (\Exception $e) {
                echo $e->getResponse()->getBody()->getContents();
            }
        }

        return $events;
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
