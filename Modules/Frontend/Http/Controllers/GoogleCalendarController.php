<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Auth;
use Illuminate\Http\Request;
use Modules\Frontend\Http\GoogleCalendarClient;

class GoogleCalendarController extends Controller
{

    public function getToken() {
        return response(Auth::user()->google_calendar_token ? 1 : 0);
    }

    public function callback(Request $request)
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
    public function getClient()
    {
        $GoogleCalendarClient = new GoogleCalendarClient();
        return response()->json($GoogleCalendarClient->client);
    }

    public function remove()
    {
        $authUser = Auth::user();
        $authUser->google_calendar_token = null;
        $authUser->save();
        return response(['removed' => true]);
    }

}