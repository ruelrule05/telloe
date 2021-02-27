<?php

namespace App\Services;

use App\Models\Notification;
use Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class NotificationService
{
    use AuthorizesRequests;

    public static function index(Request $request)
    {
        $notifications = Notification::where('is_read', false)->where('user_id', Auth::user()->id)->orderBy('created_at', 'DESC')->get();

        return $notifications;
    }

    public function show($id, Request $request)
    {
        $notification = Notification::findOrFail($id);
        $this->authorize('show', $notification);
        return $notification;
    }

    public function update($id, Request $request)
    {
        $notification = Notification::findOrFail($id);
        $this->authorize('update', $notification);
        $notification->update([
            'is_read' => true,
        ]);
        return ['success' => true];
    }

    public static function store(Request $request)
    {
        return ;
    }

    public static function delete($id)
    {
        return ;
    }

    public static function clear(Request $request)
    {
        Notification::where('user_id', Auth::user()->id)->update([
            'is_read' => true
        ]);
        return ['success' => true];
    }
}
