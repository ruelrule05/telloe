<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Services\NotificationService;

class NotificationController extends Controller
{
    //
    public function index(Request $request)
    {
        return response(NotificationService::index($request));
    }

    public function show($id, Request $request)
    {
        $notification = Notification::findOrFail($id);
        $this->authorize('show', $notification);
        return response()->json($notification);
    }

    public function update($id, Request $request)
    {
        $notification = Notification::findOrFail($id);
        $this->authorize('update', $notification);
        $notification->update([
            'is_read' => true,
        ]);
        return response()->json(['success' => true]);
    }

    public function clear(Request $request)
    {
        return response(NotificationService::clear($request));
    }
}
