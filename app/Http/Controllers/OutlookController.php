<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\OutlookService;

class OutlookController extends Controller
{
    public function getToken()
    {
        return response(OutlookService::index());
    }

    public function callback(Request $request)
    {
        return response(OutlookService::callback($request));
    }

    public function remove()
    {
        return response(OutlookService::remove());
    }

    public function getClient()
    {
        return response(OutlookService::getClient());
    }
}
