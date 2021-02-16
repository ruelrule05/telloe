<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\UserBlacklistedService;
use Auth;

class UserBlacklistedServicesController extends Controller
{
    //
    public function index(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required|exists:users,id'
        ]);
        $userBlacklistedServices = UserBlacklistedService::where('user_id', $request->user_id)->get();

        return response()->json($userBlacklistedServices);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'is_blacklisted' => 'required|boolean',
            'user_id' => 'required|exists:users,id',
            'service_id' => 'required|exists:services,id',
        ]);
        $service = Service::find($request->service_id);
        $this->authorize('blacklist', $service);
        $userBlacklistedService = UserBlacklistedService::updateOrCreate(
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
