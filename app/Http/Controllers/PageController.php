<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\PageService;

class PageController extends Controller
{
    //

    public function homepage(Request $request)
    {
        return response(PageService::homepage($request));
    }

    public function privacyPolicy(Request $request)
    {
        return response(PageService::privacyPolicy($request));
    }

    public function termsOfService(Request $request)
    {
        return response(PageService::termsOfService($request));
    }
}
