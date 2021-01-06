<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Frontend\Http\Xirsys;

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
