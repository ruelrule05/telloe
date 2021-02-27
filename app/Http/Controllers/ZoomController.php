<?php

namespace App\Http\Controllers;

use App\Http\Requests\ZoomCreateMeetingRequest;
use App\Services\ZoomService;
use Illuminate\Http\Request;

class ZoomController extends Controller
{
    //
    public function install()
    {
        return response(ZoomService::install());
    }

    public function remove()
    {
        return response(ZoomService::remove());
    }

    public function getToken()
    {
        return response(ZoomService::getToken());
    }

    public function callback(Request $request)
    {
        return response(ZoomService::callback($request));
    }

    public function createMeeting(ZoomCreateMeetingRequest $request)
    {
        return response(ZoomService::createMeeting($request));
    }
}
