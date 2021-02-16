<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Http\Xirsys;

class XirsysController extends Controller
{
    //
    public function getIceServers()
    {
        return response((new Xirsys())->getIceServers());
    }

    public function getToken(Request $request)
    {
        return response((new Xirsys())->getToken($request->id));
    }

    public function getHost(Request $request)
    {
        return response((new Xirsys())->getHost($request->id));
    }
}
