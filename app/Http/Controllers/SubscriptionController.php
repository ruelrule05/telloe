<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSubscriptionRequest;
use App\Services\SubscriptionService;

class SubscriptionController extends Controller
{
    public function store(StoreSubscriptionRequest $request)
    {
        return response(SubscriptionService::store($request));
    }

    public function destroy($id)
    {
        return response(SubscriptionService::destroy($id));
    }
}
