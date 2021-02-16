<?php

namespace App\Services;

use App\Models\PendingSubscription;
use Auth;
use Illuminate\Http\Request;

class PendingSubscriptionService
{
    public static function index()
    {
        $pendingSubscriptions = PendingSubscription::with('contact.contactUser')->where('user_id', Auth::user()->id)->orderBy('created_at', 'DESC')->get();
        return $pendingSubscriptions;
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
