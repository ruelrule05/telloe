<?php

namespace App\Http\Controllers;

use App\Services\XirsysService;
use Illuminate\Http\Request;

class XirsysController extends Controller
{
    //
    public function getIceServers()
    {
        return response(XirsysService::getIceServers());
    }

    public function getToken(Request $request)
    {
        return response(XirsysService::getToken($request));
    }

    public function getHost(Request $request)
    {
        //return response('wss://ss-api2.xirsys.com:443/ws');
        return response(XirsysService::getHost($request));
    }
}
