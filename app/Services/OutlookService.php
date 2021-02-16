<?php

namespace App\Services;

use Auth;
use Illuminate\Http\Request;

class OutlookService
{
    public static function index()
    {
        return Auth::user()->outlook_token ? 1 : 0;
    }

    public static function callback(Request $request)
    {
        $OutlookClient = new OutlookClient();
        $user = $OutlookClient->callback($request);
        echo '
            <script>
                window.close();
            </script>';

        return;
    }

    public static function remove()
    {
        $authUser = Auth::user();
        $authUser->outlook_token = null;
        $authUser->save();
        return ['removed' => true];
    }

    public static function getClient()
    {
        $OutlookClient = new \App\Http\OutlookClient();
        return $OutlookClient->client;
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
