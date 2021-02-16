<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\XirsysService;

class XirsysController extends Controller
{
    //
    public function getIceServers()
    {
        return response(XirsysService::getIceServers());
    }

    public function getToken(Request $request)
    {
        return response(XirsysService::getToken($request->id));
    }

    public function getHost(Request $request)
    {
        return response(XirsysService::getHost($request->id));
    }
}
