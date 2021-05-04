<?php

namespace App\Http\Controllers;

use App\Services\GoogleCalendarService;
use Illuminate\Http\Request;
use Auth;

class GoogleCalendarController extends Controller
{
    public function getToken()
    {
        return response(GoogleCalendarService::getToken());
    }

    public function callback(Request $request)
    {
        return response(GoogleCalendarService::callback($request));
    }

    public function getClient()
    {
        return response()->json(GoogleCalendarService::getClient());
    }

    public function remove()
    {
        return response(GoogleCalendarService::remove());
    }

    public function update(Request $request) {
        $this->validate($request, [
            'google_calendar_id' => 'required'
        ]);
        return GoogleCalendarService::update($request);
    }
    public function googleCalendarEvents()
    {
        return GoogleCalendarService::googleCalendarEvents();
    }

    public function googleCalendarList(Request $request)
    {
        return response(GoogleCalendarService::googleCalendarList($request));
    }
}
