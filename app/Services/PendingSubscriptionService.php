<?php

namespace App\Services;

use App\Http\Requests\StorePendingSubscriptionRequest;
use App\Models\Contact;
use App\Models\PendingSubscription;
use Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class PendingSubscriptionService
{
    use AuthorizesRequests;

    public static function index()
    {
        $pendingSubscriptions = PendingSubscription::with('contact.contactUser')->where('user_id', Auth::user()->id)->orderBy('created_at', 'DESC')->get();
        return $pendingSubscriptions;
    }

    public static function show($id)
    {
        return ;
    }

    public static function store(StorePendingSubscriptionRequest $request)
    {
        $contact = Contact::findOrFail($request->contact_id);

        $data = $request->all();
        $data['user_id'] = Auth::user()->id;
        $total = 0;
        foreach ($request->services as $service) {
            if ($service['rate'] && $service['frequency'] && $service['frequency_interval']) {
                $total += ($service['frequency'] * $service['rate']);
            }
        }
        $data['amount'] = $total * 100;
        $pendingSubscription = PendingSubscription::create($data);

        return response()->json($pendingSubscription->load('contact.contactUser'));
    }

    public static function update($id, Request $request)
    {
        return ;
    }

    public function destroy(PendingSubscription $pendingSubscription)
    {
        $this->authorize('delete', $pendingSubscription);
        $pendingSubscription->delete();

        return ['deleted' => true];
    }
}
