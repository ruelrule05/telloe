<?php

namespace App\Services;

use Auth;
use Illuminate\Http\Request;
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
