<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\GoogleCalendarService;

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
        return response(GoogleCalendarService::getClient());
    }

    public function remove()
    {
        return response(GoogleCalendarService::remove());
    }
}
