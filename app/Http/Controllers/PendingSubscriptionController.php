<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\PendingSubscription;
use Auth;
use App\Http\Requests\StorePendingSubscriptionRequest;
use App\Services\PendingSubscriptionService;

class PendingSubscriptionController extends Controller
{
    public function index()
    {
        return response(PendingSubscriptionService::index());
    }

    public function store(StorePendingSubscriptionRequest $request)
    {
        $contact = Contact::findOrFail($request->contact_id);
        $this->authorize('create_subscription', $contact);

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

    public function destroy(PendingSubscription $pendingSubscription)
    {
        $this->authorize('delete', $pendingSubscription);
        $pendingSubscription->delete();

        return response()->json(['deleted' => true]);
    }
}
