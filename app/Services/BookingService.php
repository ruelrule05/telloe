<?php

namespace App\Services;

use App\Http\GoogleCalendarClient;
use App\Http\Requests\DestroyCalendarRequest;
use App\Models\Booking;
use Auth;
use Carbon\Carbon;
use File;
use Google_Service_Calendar;
use Illuminate\Http\Request;

class BookingService
{
    public static function index(Request $request)
    {
        return;
    }

    public static function show($id)
    {
        return ;
    }

    public static function store(Request $request)
    {
        return;
    }

    public static function update($id, Request $request)
    {
        return;
    }

    public static function destroy($id)
    {
        return;
    }

    public static function removeCalendar(DestroyCalendarRequest $request)
    {
        $user = Auth::user();

        switch ($request->calendar) :
            case 'google':
                $GoogleCalendarClient = new GoogleCalendarClient();
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

    public static function googleCalendarEvents()
    {
        $events = [];
        $calendarId = Auth::user()->google_calendar_id;
        if ($calendarId) {
            $GoogleCalendarClient = new GoogleCalendarClient();
            $client = $GoogleCalendarClient->client;
            $service = new Google_Service_Calendar($client);
            $eventsList = $service->events->listEvents($calendarId);
            while (true) {
                foreach ($eventsList->getItems() as $event) {
                    if (! isset($event->getExtendedProperties()->private['booking'])) {
                        $events[] = $event;
                    }
                }
                $pageToken = $eventsList->getNextPageToken();
                if ($pageToken) {
                    $optParams = ['pageToken' => $pageToken];
                    $eventsList = $service->events->listEvents($calendarId, $optParams);
                } else {
                    break;
                }
            }
        }

        $user = Auth::user();
        $user->google_calendar_events = $events;
        $user->save();

        return $events;
    }

    public static function googleCalendarList(Request $request)
    {
        $GoogleCalendarClient = new GoogleCalendarClient();
        $calendars = [];
        if (! isset($GoogleCalendarClient->client->authUrl)) {
            $client = $GoogleCalendarClient->client;
            $service = new Google_Service_Calendar($client);

            $calendarList = $service->calendarList->listCalendarList([
                'showHidden' => true,
                'showDeleted' => true,
            ]);
            while (true) {
                foreach ($calendarList->getItems() as $calendarListEntry) {
                    $calendars[] = $calendarListEntry;
                }
                $pageToken = $calendarList->getNextPageToken();
                if ($pageToken) {
                    $optParams = ['pageToken' => $pageToken];
                    $calendarList = $service->calendarList->listCalendarList($optParams);
                } else {
                    break;
                }
            }

            usort($calendars, function ($a, $b) {
                return strcmp($a->summary, $b->summary);
            });
        }
        $user = Auth::user();
        $user->google_calendars = $calendars;
        $user->save();

        return $calendars;
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
}
