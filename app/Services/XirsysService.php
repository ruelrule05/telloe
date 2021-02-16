<?php

namespace App\Services;

use App\Http\Xirsys;
use Illuminate\Http\Request;

class XirsysService
{
    public static function getIceServers()
    {
        return (new Xirsys())->getIceServers();
    }

    public static function getToken(Request $request)
    {
        return (new Xirsys())->getToken($request->id);
    }

    public static function getHost(Request $request)
    {
        return (new Xirsys())->getHost($request->id);
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
