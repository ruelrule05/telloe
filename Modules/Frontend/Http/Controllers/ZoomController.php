<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ZoomController extends Controller
{
    //
    public function install()
    {
        return response(config('zoom.install_url'));
    }

    public function remove()
    {
        $authUser = Auth::user();
        $authUser->zoom_token = null;
        $authUser->save();
        return response(['removed' => true]);
    }

    public function getToken() {
        return response(Auth::user()->zoom_token ? 1 : 0);
    }

    public function callback(Request $request)
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
        $authUser->zoom_token = $token;
        $authUser->save();
        echo '
            <script>
                window.close();
            </script>';

        return;
    }

    public function createMeeting(Request $request)
    {
        $this->validate($request, [
            'booking_id' => 'required|exists:bookings,id'
        ]);
        $booking = Booking::findOrFail($request->booking_id);
        $this->authorize('createZoomLink', $booking);
        if($booking->zoom_link) {
            return $booking->zoom_link;
        }

        $authUser = Auth::user();
        if ($authUser->zoom_token['access_token']) {
            try {
                $response = Http::withToken($authUser->zoom_token['access_token'])
                ->post('https://api.zoom.us/v2/users/me/meetings', [
                    'topic' => $booking->service->name,
                    'start_time' => Carbon::parse("$booking->date $booking->start")->toIso8601ZuluString(), // booking time
                    'type' => 2, // Scheduled meeting
                ]);

                $data = $response->getBody();
                $booking->update([
                    'zoom_link' => json_decode($data)
                ]);
                return response($data);
            } catch (\Exception $e) {
                if (401 == $e->getCode()) {
                    $refresh_token = $authUser->zoom_token['refresh_token'];

                    $response = Http::withBasicAuth(config('zoom.client_id'), config('zoom.client_secret'))
                    ->asForm()
                    ->post('https://zoom.us/oauth/token', [
                        'grant_type' => 'refresh_token',
                        'refresh_token' => $refresh_token
                    ]);
                    $token = json_decode($response->getBody());
                    $authUser->zoom_token = $token;
                    $authUser->save();
                } else {
                    echo $e->getMessage();
                }
            }
        }
    }
}
