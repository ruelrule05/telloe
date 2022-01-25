<?php

namespace App\Services;

use App\Models\UserVideo;
use Auth;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;

class UserVideoService
{
    use ValidatesRequests;

    public static function index(Request $request)
    {
        return response()->json(Auth::user()->videos);
    }

    public static function store(Request $request)
    {
        (new self)->validate($request, [
            'source' => 'nullable|string|max:255',
            'gif' => 'nullable|string|max:255',
            'thumbnail' => 'nullable|string|max:255',
            'duration' => 'required|integer',
        ]);
        $authUser = Auth::user();
        $data = $request->only('source','gif', 'thumbnail', 'duration');
        $data['user_id'] = $authUser->id;
        $userVideo = UserVideo::create($data);
        return response()->json($userVideo);
    }
}
