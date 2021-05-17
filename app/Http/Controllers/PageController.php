<?php

namespace App\Http\Controllers;

use App\Services\PageService;
use Illuminate\Http\Request;

class PageController extends Controller
{
    //
    public function homepage(Request $request)
    {
        return PageService::homepage($request);
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