<?php

namespace App\Services;

use App\Http\Requests\IndexUserBlackListedServiceRequest;
use App\Http\Requests\StoreUserBlackListedServiceRequest;
use App\Models\Service;
use App\Models\UserBlacklistedService;

class UserBlacklistedServiceService
{
    public static function index(IndexUserBlackListedServiceRequest $request)
    {
        $userBlacklistedServices = UserBlacklistedService::where('user_id', $request->user_id)->get();

        return response()->json($userBlacklistedServices);
    }

    public static function show($id)
    {
        return ;
    }

    public static function store(StoreUserBlackListedServiceRequest $request)
    {
        $service = Service::find($request->service_id);

        $userBlacklistedService = UserBlacklistedService::updateOrCreate(
            [
                'service_id' => $service->id,
                'user_id' => $request->user_id
            ],
            [
                'is_blacklisted' => $request->is_blacklisted
            ]
        );
        return $userBlacklistedService;
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
