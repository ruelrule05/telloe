<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Requests\ZoomCreateMeetingRequest;
use App\Http\Zoom;
use App\Services\ZoomService;

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
        $booking = Booking::findOrFail($request->booking_id);
        $this->authorize('createZoomLink', $booking);

        unset($booking->user);

        if ($booking->zoom_link) {
            return response($booking->zoom_link);
        }

        $zoomLink = Zoom::createMeeting(Auth::user(), $booking->service->name, Carbon::parse("$booking->date $booking->start")->toIso8601ZuluString());

        if ($zoomLink) {
            $booking->update([
                'zoom_link' => $zoomLink
            ]);
        }

        return response($zoomLink);
    }
}
