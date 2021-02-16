<?php

namespace App\Services;

use \Facebook\Facebook;
use Auth;
use Illuminate\Http\Request;

class InquiryService
{
    public static function index(Request $request)
    {
        $inquiries = [];
        if (Auth::user()->widget) {
            $inquiries = Auth::user()->widget->inquiries->load('user', 'inquiryType', 'inquiryMedia');
        }

        return $inquiries;
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

    public static function messengerNotify()
    {
        $facebook = new Facebook([
            'app_id' => '1187408638266444',
            'app_secret' => '89e9f7be3a3d38d7e0b0f332d7a5fc02',
            'graph_api_version' => 'v5.0',
        ]);
        $facebookRequest = $facebook->request(
            'POST',
            '/me/messages',
            [
                'access_token' => 'EAAQ38R4WTEwBAAArvJrFSYHsF3WHSpaV4NcVk9spHu1l8BPz59nwJqw4yovYWzcx1OUirdR6OblqTds5kLDpXT57pyh0eoSXTBWwf61jpZCuhqIdTv2qy7s7QvXsOmMzMY4a9TYJvCQzW2K9nVJgM0Ao1B6D6ZA0j87pEtVjhKex4Npv4N',
                'recipient' => [
                    'id' => '3011644205562087'
                ],
                'message' => [
                    'text' => 'test message'
                ]
            ]
        );
        return  $facebook->getClient()->sendRequest($facebookRequest);
    }
}
