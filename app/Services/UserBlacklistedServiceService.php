<?php

namespace App\Services;

use App\Models\UserBlacklistedService;
use App\Http\Requests\IndexUserBlackListedServiceRequest;

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
