<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePendingSubscriptionRequest;
use App\Models\PendingSubscription;
use App\Services\PendingSubscriptionService;

class PendingSubscriptionController extends Controller
{
    public function index()
    {
        return response(PendingSubscriptionService::index());
    }

    public function store(StorePendingSubscriptionRequest $request)
    {
        return PendingSubscriptionService::store($request);
    }

    public function destroy(PendingSubscription $pendingSubscription)
    {
        $pendingSubcriptionService = new PendingSubscriptionService();
        return response($pendingSubcriptionService->destroy($pendingSubscription));
    }
}
