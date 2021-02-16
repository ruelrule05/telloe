<?php

namespace App\Services;

use App\Models\Notification;
use Auth;
use Illuminate\Http\Request;

class NotificationService
{
    public static function index(Request $request)
    {
        $notifications = Notification::where('is_read', false)->where('user_id', Auth::user()->id)->orderBy('created_at', 'DESC')->get();

        return $notifications;
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

    public static function clear(Request $request)
    {
        Notification::where('user_id', Auth::user()->id)->update([
            'is_read' => true
        ]);
        return ['success' => true];
    }
}
