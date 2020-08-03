<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notification;
use Auth;

class NotificationController extends Controller
{
    //
    public function index(Request $request)
    {
        $notifications = Notification::where('user_id', Auth::user()->id)->orderBy('created_at', 'DESC')->get();
        return response()->json($notifications);
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
}
