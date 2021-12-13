<?php

namespace App\Services;

use App\Http\OutlookClient;
use App\Jobs\OutlookCalendarEvents;
use Auth;
use Cache;
use Illuminate\Http\Request;

class OutlookService
{
    public static function index()
    {
        return Auth::user()->outlook_token ? 1 : 0;
    }

    public static function callback(Request $request)
    {
        $OutlookClient = new OutlookClient();
        $OutlookClient->callback($request);
        return redirect('/dashboard/integrations');
    }

    public static function remove()
    {
        $authUser = Auth::user();
        $authUser->outlook_token = null;
        $authUser->save();
        return ['removed' => true];
    }

    public static function getClient()
    {
        $OutlookClient = new OutlookClient();
        return $OutlookClient->client;
    }

    public static function update(Request $request)
    {
        $authUser = Auth::user();
        $authUser->outlook_calendar_id = $request->outlook_calendar_id;
        Cache::forget("{$authUser->id}_outlook_calendar_events");
        $authUser->save();
        $request->merge([
            'refresh' => true,
        ]);
        return self::outlookCalendarEvents($request);
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

    public static function outlookCalendarEvents(Request $request)
    {
        $events = [];
        $user = Auth::user();

        if ($user->outlook_calendar_id && $user->outlook_token) {
            if ($request->refresh) {
                $outlookEvents = [];
                $OutlookClient = new OutlookClient();
                $graph = new \Microsoft\Graph\Graph();
                $graph->setAccessToken($OutlookClient->accessToken);
                foreach ($user->outlook_calendar_id as $calendarID) {
                    $getEventsUrl = "/me/calendars/$calendarID/events";
                    try {
                        $eventsList = $graph->createRequest('GET', $getEventsUrl)
                        ->setReturnType(\Microsoft\Graph\Model\Event::class)
                        ->execute();
                        foreach ($eventsList as $event) {
                            $outlookEvents[] = $event;
                        }
                    } catch (\Exception $e) {
                        //echo $e->getResponse()->getBody()->getContents();
                    }
                }
                Cache::forever("{$user->id}_outlook_calendar_events", $outlookEvents);
                $events = $outlookEvents;
            } else {
                $events = Cache::get('1_outlook_calendar_events', []);
            }
        }

        OutlookCalendarEvents::dispatch($user);
        return response()->json($events);
    }
}
