<?php

namespace App\Services;

use App\Http\Zoom;
use App\Models\Booking;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;

class ZoomService
{
    public static function install()
    {
        return config('zoom.install_url');
    }

    public static function remove()
    {
        $authUser = Auth::user();
        $authUser->zoom_token = null;
        $authUser->save();
        return ['removed' => true];
    }

    public static function getToken()
    {
        return Auth::user()->zoom_token ? 1 : 0;
    }

    public static function callback(Request $request)
    {
        if (! $request->code) {
            return;
        }
        $authUser = Auth::user();
        $response = Http::withBasicAuth(config('zoom.client_id'), config('zoom.client_secret'))
        ->asForm()
        ->post('https://zoom.us/oauth/token', [
            'grant_type' => 'authorization_code',
            'code' => $request->code,
            'redirect_uri' => config('zoom.redirect_uri')
        ]);
        $token = json_decode($response->getBody());
        if (isset($token->error)) {
            return $token->reason;
        }
        $authUser->zoom_token = $token;
        $authUser->save();
        return '
            <script>
                window.close();
            </script>';
    }

    public static function createMeeting(ZoomCreateMeetingRequest $request)
    {
        $booking = Booking::findOrFail($request->booking_id);

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

        return $zoomLink;
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
