<?php

namespace App\Services;

use App\Http\GoogleCalendarClient;
use App\Http\Requests\AssignServiceToMemberRequest;
use App\Http\Requests\DestroyCalendarRequest;
use App\Http\Requests\IndexBookingRequest;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use App\Http\Requests\UpdateOutlookCalendarEventsRequest;
use App\Http\Zoom;
use App\Mail\DeleteBooking;
use App\Mail\NewBooking;
use App\Mail\UpdateBooking;
use App\Models\Booking;
use App\Models\BookingNote;
use App\Models\BookingUser;
use App\Models\Contact;
use App\Models\Notification;
use App\Models\Service;
use Auth;
use Cache;
use Carbon\Carbon;
use File;
use Google_Service_Calendar;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use  Illuminate\Support\Facades\Mail;
use Spatie\CalendarLinks\Link;

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

    public static function show($id)
    {
        return ;
    }

    public static function store(StoreBookingRequest $request)
    {
        $service = Service::findOrfail($request->service_id);
        $data = $request->validated();
        $booking = Booking::create($data);

        foreach ($data['contact_ids'] as $contactID) {
            $contact = Contact::findOrFail($contactID);
            if (Auth::user()->can('show', $contact) && ! $contact->is_pending && $contact->contact_user_id) {
                BookingUser::create([
                    'booking_id' => $booking->id,
                    'user_id' => $contact->contact_user_id,
                ]);
            }
        }

        $emails = array_unique($data['emails']);
        foreach ($emails as $email) {
            BookingUser::create([
                'booking_id' => $booking->id,
                'user_id' => NULL,
                'guest' => [
                    'email' => $email
                ]
            ]);
        }

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

        Mail::queue(new NewBooking([$booking], 'serviceUser'));
        Mail::queue(new NewBooking([$booking], 'customer'));

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

        return response()->json($booking->fresh()->load('service.assignedServices', 'bookingNote', 'bookingUsers.user'));
    }

    public static function update($id, UpdateBookingRequest $request)
    {
        $booking = Booking::findOrfail($id);
        $service = $booking->service;
        $now = Carbon::now();
        $startDate = Carbon::parse("$booking->date $booking->start");
        $booking->update($request->validated());

        // if (isset($request->booking_note['note'])) {
        //     BookingNote::updateOrCreate(
        //         ['booking_id' => $booking->id],
        //         ['note' => $request->booking_note['note']]
        //     );
        // }

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

        switch ($request->calendar) :
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
                $extensionName = env('GRAPH_EXTENSION_NAME');
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
        endswitch;

        return ['success' => true];
    }

    public static function outlookCalendarEvents(Request $request)
    {
        $events = [];
        $extensionName = env('GRAPH_EXTENSION_NAME');
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
        $tomorrow = Carbon::now()->addDay(1);
        $daysAgo = Carbon::now()->subDays(5);
        return Booking::with('bookingUsers.user', 'service', 'bookingLink')->whereBetween('date', [$daysAgo, $tomorrow])->has('service')->orHas('bookingLink')->get()->toArray();
        return response(Booking::with('bookingUsers.user', 'service')->whereBetween('date', [$daysAgo, $tomorrow])->has('service')->orHas('bookingLink')->get());
    }
}
