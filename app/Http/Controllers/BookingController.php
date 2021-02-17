<?php

namespace App\Http\Controllers;

use App\Http\GoogleCalendarClient;
use App\Http\Requests\IndexBookingRequest;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use App\Http\Requests\UpdateGoogleCalendarEventsRequest;
use App\Http\Requests\UpdateOutlookCalendarEventsRequest;
use App\Http\Zoom;
use App\Mail\DeleteBooking;
use App\Mail\NewBooking;
use App\Mail\UpdateBooking;
use App\Models\Booking;
use App\Models\BookingNote;
use App\Models\Contact;
use App\Models\Notification;
use App\Models\Service;
use App\Services\BookingService;
use Auth;
use Carbon\Carbon;
use Google_Service_Calendar;
use Google_Service_Calendar_Event;
use Illuminate\Http\Request;
use Mail;
use Spatie\CalendarLinks\Link;

class BookingController extends Controller
{
    public function index(IndexBookingRequest $request)
    {
        $bookings = [];

        $bookings = Booking::where(function ($query) {
            $query->has('user');
        })->with('user', 'service')->whereHas('service', function ($service) {
            $service->where('user_id', Auth::user()->id)->orWhereHas('parentService', function ($parentService) {
                $parentService->where('user_id', Auth::user()->id);
            });
        });

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

        return response()->json($bookings);
    }

    public function store(StoreBookingRequest $request)
    {
        if (! $request->user_id && ! $request->contact_id) {
            return abort(403, 'User ID or Contact ID is required.');
        }

        if (Carbon::now()->greaterThan(Carbon::parse($request->date . ' ' . $request->start))) {
            return abort(403, 'Invalid date.');
        }
        if ($request->user_id == Auth::user()->id) {
            return abort(403, 'Action is not allowed.');
        }

        $service = Service::findOrfail($request->service_id);
        $this->authorize('addBooking', $service);
        $timeslots = $service->timeslots($request->date);

        if ($request->contact_id) {
            $contact = Contact::findOrFail($request->contact_id);
            $this->authorize('show', $contact);
            if (in_array($service->id, $contact->blacklisted_services)) {
                return abort(403, 'The selected service is blacklisted for this contact.');
            }
        }

        $timeslotAvailable = false;
        foreach ($timeslots as $timeslot) {
            if ($timeslot['time'] == $request->start && $timeslot['is_available'] == true) {
                $timeslotAvailable = true;
                break;
            }
        }

        if (! $timeslotAvailable) {
            return abort(403, 'The selected date or time is not anymore available.');
        }

        $data = $request->all();

        $parts = explode(':', $request->start);
        $endTime = Carbon::now();
        $endTime->set('hour', $parts[0]);
        $endTime->set('minute', $parts[1]);
        $endTime->add('minute', $service->duration);
        $data['end'] = $endTime->format('H:i');
        if (isset($data['user_id'])) {
            $data['user_id'] = ($service->user_id == $request->user_id) ? Auth::user()->id : $data['user_id'];
        }

        $booking = Booking::create($data);

        if ($service->create_zoom_link && $service->user->zoom_token) {
            $zoomLink = Zoom::createMeeting($service->user, $booking->service->name, Carbon::parse("$booking->date $booking->start")->toIso8601ZuluString());
            if ($zoomLink) {
                $booking->update([
                    'zoom_link' => $zoomLink['join_url']
                ]);
            }
        }

        $from = Carbon::parse("$booking->date $booking->start");
        $to = $from->clone()->addMinute($booking->service->duration);
        $link = Link::create($booking->service->name, $from, $to)
            ->description($booking->service->description);

        $booking->google_link = $link->google();
        $booking->outlook_link = url('/ics?name=' . $booking->service->name . '&data=' . $link->ics());
        $booking->yahoo_link = $link->yahoo();
        $booking->ical_link = $booking->outlook_link;

        Mail::queue(new NewBooking([$booking], 'client'));
        Mail::queue(new NewBooking([$booking], 'contact'));

        $user_id = null;
        $description = '';
        $link = '';
        if ($booking->user) {
            if (Auth::user()->id == $booking->user_id) { // if contact - notify client
                $user_id = $booking->service->user->id;
                $description = "<strong>{$booking->user->full_name}</strong> has placed a booking.";
                $contact = $booking->contact ?? Contact::where('user_id', $booking->service->user_id)->where('contact_user_id', $booking->user_id)->first() ?? null;
                if ($contact) {
                    $link = "/dashboard/contacts/$contact->id";
                }
            } elseif (Auth::user()->id == $booking->service->user_id) { // if client - notify contact
                $user_id = $booking->user->id;
                $description = 'A booking has been placed for your account.';
            }

            Notification::create([
                'user_id' => $user_id,
                'description' => $description,
                'link' => $link
            ]);
        }

        return response()->json($booking->fresh()->load('service.assignedServices', 'bookingNote'));
    }

    public function update($id, UpdateBookingRequest $request)
    {
        $booking = Booking::findOrfail($id);
        $service = Service::findOrFail($request->service_id);

        $this->authorize('update', $booking);
        $this->authorize('show', $service);

        $now = Carbon::now();
        $startDate = Carbon::parse("$booking->date $booking->start");

        if ($now->greaterThan($startDate)) {
            if (isset($request->booking_note['note'])) {
                BookingNote::updateOrCreate(
                    ['booking_id' => $booking->id],
                    ['note' => $request->booking_note['note']]
                );
            }
            return response($booking);
        }

        if (Carbon::parse($now->format('Y-m-d'))->greaterThan(Carbon::parse($request->date))) {
            return abort(403, 'Invalid date.');
        }

        $timeslots = $service->timeslots($request->date);
        $timeslotAvailable = false;
        if (($service->user_id == Auth::user()->id || $service->id == $booking->service_id) && $request->date == $booking->date && $request->start == $booking->start) {
            $timeslotAvailable = true;
        } else {
            foreach ($timeslots as $timeslot) {
                if ($timeslot['time'] == $request->start) {
                    if ($timeslot['is_available']) {
                        $timeslotAvailable = true;
                    }
                    break;
                }
            }
        }

        if (! $timeslotAvailable) {
            return abort(403, 'The selected date or time is not anymore available.');
        }

        $data = $request->all();

        $parts = explode(':', $request->start);
        $endTime = Carbon::now();
        $endTime->set('hour', $parts[0]);
        $endTime->set('minute', $parts[1]);
        $endTime->add('minute', $booking->service->duration);
        $data['end'] = $endTime->format('H:i');

        unset($booking->user);
        $booking->update($data);

        if (isset($request->booking_note['note'])) {
            BookingNote::updateOrCreate(
                ['booking_id' => $booking->id],
                ['note' => $request->booking_note['note']]
            );
        }

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

    public function destroy($id)
    {
        $booking = Booking::with('user', 'contact', 'service.user')->where('id', $id)->first();
        $this->authorize('delete', $booking);

        Mail::queue(new DeleteBooking($booking->toArray()));

        if ($booking->user) {
            $user_id = null;
            if (Auth::user()->id == $booking->user_id) { // if contact - notify client
                $user_id = $booking->service->user->id;
                $description = "<strong>{$booking->user->full_name}</strong> has deleted their booking.";
            } elseif (Auth::user()->id == $booking->service->user_id) { // if client - notify contact
                $user_id = $booking->user->id;
                $description = 'A booking you made has been deleted.';
            }

            if ($user_id) {
                Notification::create([
                    'user_id' => $user_id,
                    'description' => $description,
                ]);
            }
        }
        $booking->delete();
        return response()->json(['success' => true]);
    }

    public function googleCalendarEvents()
    {
        return response(BookingService::googleCalendarEvents());
    }

    public function googleCalendarList(Request $request)
    {
        return response(BookingService::googleCalendarList($request));
    }

    public function updateGoogleCalendarEvents(UpdateGoogleCalendarEventsRequest $request)
    {
        $GoogleCalendarClient = new GoogleCalendarClient();
        $client = $GoogleCalendarClient->client;
        $service = new Google_Service_Calendar($client);

        $events = [];
        $oldCalendarId = Auth::user()->google_calendar_id;
        $calendarId = $request->google_calendar_id;
        $user = Auth::user();
        $user->google_calendar_id = $calendarId;
        $user->save();

        // delete booking events from previous calendar
        if ($oldCalendarId) {
            $calendarEvents = $service->events->listEvents($oldCalendarId, ['privateExtendedProperty' => 'booking=yes']);
            while (true) {
                foreach ($calendarEvents->getItems() as $event) {
                    $evId = $event->getId();
                    $service->events->delete($oldCalendarId, $evId);
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

        // delete existing events
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

        $bookings = Booking::whereHas('service', function ($service) {
            $service->where('user_id', Auth::user()->id);
        })->get();

        foreach ($bookings as $booking) {
            $event = new Google_Service_Calendar_Event([
                'summary' => $booking->service->name,
                'description' => $booking->service->description,
                'start' => [
                    'dateTime' => Carbon::parse("$booking->date $booking->start")->toRfc3339String(),
                    'timeZone' => $booking->service->user->timezone,
                ],
                'end' => [
                    'dateTime' => Carbon::parse("$booking->date $booking->end")->toRfc3339String(),
                    'timeZone' => $booking->service->user->timezone,
                ],
                'attendees' => [
                    ['email' => $booking->user->email],
                    ['email' => $booking->service->user->email],
                ],
                'extendedProperties' => [
                    'private' => [
                        'booking' => 'yes'
                    ]
                ]
            ]);
            $event = $service->events->insert($calendarId, $event);
            $events[] = $event;
        }

        return response()->json($events);
    }

    public function updateOutlookCalendarEvents(UpdateOutlookCalendarEventsRequest $request)
    {
        $extensionName = env('GRAPH_EXTENSION_NAME');

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

        return response()->json($events);
    }

    public function outlookCalendarEvents(Request $request)
    {
        return response(BookingService::outlookCalendarEvents($request));
    }

    public function outlookCalendarList(Request $request)
    {
        return response(BookingService::outlookCalendarList($request));
    }

    public function removeCalendar(DestroyCalendarRequest $request)
    {
        return response(BookingService::removeCalendar($request));
    }

    public function assignToMember($id, AssignServiceToMemberRequest $request)
    {
        $booking = Booking::findOrfail($id);
        $this->authorize('update', $booking);

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

        return response($booking);
    }

    public function downloadIcs(Request $request)
    {
        return response(BookingService::downloadIcs($request));
    }
}
