<?php

namespace App\Http\Controllers;

use App\Services\NotificationService;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    //
    public function index(Request $request)
    {
        return response(NotificationService::index($request));
    }

    public function show($id, Request $request)
    {
        $notificationService = new NotificationService();
        return response($notificationService->show($id, $request));
    }

    public function update($id, Request $request)
    {
        $notificationService = new NotificationService();
        return response($notificationService->update($id, $request));
    }

    public function clear(Request $request)
    {
        return response(NotificationService::clear($request));
    }
}
