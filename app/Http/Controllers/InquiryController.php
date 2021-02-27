<?php

namespace App\Http\Controllers;

use App\Services\InquiryService;
use Illuminate\Http\Request;

class InquiryController extends Controller
{
    //

    public function index(Request $request)
    {
        return response(InquiryService::index($request));
    }

    public function show($id)
    {
        $inquiry = new InquiryService();
        return response($inquiry->show($id));
    }

    public function postMessage($id, Request $request)
    {
        $inquiry = new InquiryService();
        return $inquiry->postMessage($id, $request);
    }

    public function messengerNotify()
    {
        return response(InquiryService::messengerNotify());
    }
}
