<?php

namespace App\Http\Controllers;

use App\Services\OutlookService;
use Auth;
use Illuminate\Http\Request;

class OutlookController extends Controller
{
    public function getToken()
    {
        return response(OutlookService::index());
    }

    public function callback(Request $request)
    {
        return OutlookService::callback($request);
    }

    public function remove()
    {
        return response(OutlookService::remove());
    }

    public function getClient()
    {
        if (! Auth::user()->is_premium) {
            return abort(403, 'Please upgrade your account to integrate Outlook Calendar');
        }
        return response()->json(OutlookService::getClient());
    }

    public function update(Request $request)
    {
        return OutlookService::update($request);
    }

    public function outlookCalendarEvents(Request $request)
    {
        return OutlookService::outlookCalendarEvents($request);
    }

    public function outlookCalendarList(Request $request)
    {
        return response(OutlookService::outlookCalendarList($request));
    }
}
