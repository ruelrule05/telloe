<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Http\Requests\IndexUserBlackListedServiceRequest;
use App\Http\Requests\StoreUserBlackListedServiceRequest;
use App\Services\UserBlacklistedServiceService;

class UserBlacklistedServicesController extends Controller
{
    //
    public function index(IndexUserBlackListedServiceRequest $request)
    {
        return response(UserBlacklistedServiceService::index($request));
    }

    public function store(StoreUserBlackListedServiceRequest $request)
    {
        $service = Service::find($request->service_id);
        $this->authorize('blacklist', $service);
        $userBlacklistedService = UserBlacklistedServiceService::updateOrCreate(
            [
                'service_id' => $service->id,
                'user_id' => $request->user_id
            ],
            [
                'is_blacklisted' => $request->is_blacklisted
            ]
        );
        return response()->json($userBlacklistedService);
    }
}
