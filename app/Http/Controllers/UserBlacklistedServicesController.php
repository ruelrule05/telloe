<?php

namespace App\Http\Controllers;

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
        return response(UserBlacklistedServiceService::store($request));
    }
}
