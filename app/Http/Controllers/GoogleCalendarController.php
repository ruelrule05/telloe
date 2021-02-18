<?php

namespace App\Http\Controllers;

use App\Services\GoogleCalendarService;
use Illuminate\Http\Request;

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
}
