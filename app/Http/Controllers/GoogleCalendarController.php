<?php

namespace App\Http\Controllers;

use App\Services\GoogleCalendarService;
use Auth;
use Illuminate\Http\Request;

class GoogleCalendarController extends Controller
{
    public function getToken()
    {
        return response(GoogleCalendarService::getToken());
    }

    public function callback(Request $request)
    {
        return GoogleCalendarService::callback($request);
    }

    public function getClient()
    {
        if (! Auth::user()->is_premium) {
            return abort(403, 'Please upgrade your account to integrate Google Calendar');
        }
        return response()->json(GoogleCalendarService::getClient());
    }

    public function remove()
    {
        return response(GoogleCalendarService::remove());
    }

    public function update(Request $request)
    {
        $this->validate($request, [
            'google_calendar_id' => 'nullable|array'
        ]);
        return GoogleCalendarService::update($request);
    }

    public function googleCalendarEvents(Request $request)
    {
        return GoogleCalendarService::googleCalendarEvents($request);
    }

    public function googleCalendarList(Request $request)
    {
        return response(GoogleCalendarService::googleCalendarList($request));
    }
}
