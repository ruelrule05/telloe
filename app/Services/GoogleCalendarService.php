<?php

namespace App\Services;

use App\Http\GoogleCalendarClient;
use Auth;
use Illuminate\Http\Request;

class GoogleCalendarService
{
    public static function getToken()
    {
        return Auth::user()->google_calendar_token ? 1 : 0;
    }

    public static function callback(Request $request)
    {
        $GoogleCalendarClient = new GoogleCalendarClient();
        $GoogleCalendarClient->setAccessToken($request->code);
        echo "
            <script>
                window.code = '{$request->code}';
                window.close();
            </script>";

        return;
    }

    public static function getClient()
    {
        $GoogleCalendarClient = new GoogleCalendarClient();
        return $GoogleCalendarClient->client;
    }

    public static function remove()
    {
        $authUser = Auth::user();
        $authUser->google_calendar_token = null;
        $authUser->save();
        return ['removed' => true];
    }

    public static function index()
    {
        return ;
    }

    public static function show($id)
    {
        return ;
    }

    public static function store(Request $request)
    {
        return ;
    }

    public static function update($id, Request $request)
    {
        return ;
    }

    public static function delete($id)
    {
        return ;
    }
}
