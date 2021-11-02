<?php

namespace App\Services;

use App\Http\GoogleCalendarClient;
use App\Jobs\GoogleCalendarEvents;
use Auth;
use Cache;
use Google_Service_Calendar;
use Illuminate\Http\Request;

class GoogleCalendarService
{
    public static function getToken()
    {
        return Auth::user()->google_calendar_token ? 1 : 0;
    }

    public static function callback(Request $request)
    {
        $GoogleCalendarClient = new GoogleCalendarClient(Auth::user());
        $GoogleCalendarClient->setAccessToken($request->code);

        return redirect('/dashboard/integrations');
    }

    public static function getClient()
    {
        $GoogleCalendarClient = new GoogleCalendarClient(Auth::user());
        return $GoogleCalendarClient->client;
    }

    public static function remove()
    {
        $authUser = Auth::user();
        $authUser->google_calendar_token = null;
        $authUser->save();
        Cache::forget("{$authUser->id}_google_calendars");
        Cache::forget("{$authUser->id}_google_calendar_events");
        return ['removed' => true];
    }

    public static function googleCalendarEvents(Request $request)
    {
        $events = [];
        $user = Auth::user();
        if ($user->google_calendar_id && $user->google_calendar_token) {
            if ($request->fresh) {
                $events = Cache::get("{$user->id}_google_calendar_events", []);
            } else {
                $events = Cache::rememberForever("{$user->id}_google_calendar_events", function () use ($user) {
                    $events = [];
                    $GoogleCalendarClient = new GoogleCalendarClient($user);
                    $client = $GoogleCalendarClient->client;
                    $service = new Google_Service_Calendar($client);
                    foreach ($user->google_calendar_id as $calendarID) {
                        $eventsList = $service->events->listEvents($calendarID);
                        while (true) {
                            foreach ($eventsList->getItems() as $event) {
                                if (! isset($event->getExtendedProperties()->private['booking'])) {
                                    $events[] = $event;
                                }
                            }
                            $pageToken = $eventsList->getNextPageToken();
                            if ($pageToken) {
                                $optParams = ['pageToken' => $pageToken];
                                $eventsList = $service->events->listEvents($user->google_calendar_id, $optParams);
                            } else {
                                break;
                            }
                        };
                    }

                    return $events;
                }
                );
            }
        }

        GoogleCalendarEvents::dispatch($user);

        return $events;
    }

    public static function googleCalendarList(Request $request)
    {
        $user = Auth::user();
        $GoogleCalendarClient = new GoogleCalendarClient($user);
        $calendars = [];
        if (! isset($GoogleCalendarClient->client->authUrl)) {
            $calendars = Cache::remember("{$user->id}_google_calendars", 43200, function () use ($GoogleCalendarClient) {
                $calendars = [];
                $client = $GoogleCalendarClient->client;
                $service = new Google_Service_Calendar($client);

                $calendarList = $service->calendarList->listCalendarList();
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
                return $calendars;
            });
        }

        return $calendars;
    }

    public static function update(Request $request)
    {
        $authUser = Auth::user();
        $authUser->google_calendar_id = $request->google_calendar_id;
        Cache::forget("{$authUser->id}_google_calendar_events");
        $authUser->save();
        return self::googleCalendarEvents($request);
    }
}
