<?php

namespace App\Http;

use App\Models\User;
use Illuminate\Support\Facades\Http;

class Zoom
{
    public static function createMeeting(User $user, $topic, $startTime, $type = 2)
    {
        if (! $user->zoom_token['access_token']) {
            return false;
        }

        try {
            $response = Http::withToken($user->zoom_token['access_token'])
                ->post('https://api.zoom.us/v2/users/me/meetings', [
                    'topic' => $topic,
                    'start_time' => $startTime, // booking time
                    'type' => $type, // Scheduled meeting
                ]);
            $zoomLink = json_decode($response->getBody(), true);
            if (isset($zoomLink['code']) && $zoomLink['code'] == 124) {
                self::refreshToken($user);
                return self::createMeeting($user, $topic, $startTime, $type = 2);
            }
            return $zoomLink;
        } catch (\Exception $e) {
            if (401 == $e->getCode()) {
                self::refreshToken($user);
                return self::createMeeting($user, $topic, $startTime);
            }
            return false;
            //return abort(403, $e->getMessage());
        }
    }

    public static function refreshToken(User $user)
    {
        $refresh_token = $user->zoom_token['refresh_token'];
        $response = Http::withBasicAuth(config('zoom.client_id'), config('zoom.client_secret'))
            ->asForm()
            ->post('https://zoom.us/oauth/token', [
                'grant_type' => 'refresh_token',
                'refresh_token' => $refresh_token
            ]);
        $token = json_decode($response->getBody());
        $user->zoom_token = $token;
        $user->save();
    }
}
