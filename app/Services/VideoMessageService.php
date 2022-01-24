<?php

namespace App\Services;

use App\Models\Service;
use App\Models\UserVideo;
use App\Models\VideoMessage;
use App\Models\VideoMessageVideo;
use Auth;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;

class VideoMessageService
{
    use ValidatesRequests;

    public static function index(Request $request)
    {
        return response()->json(Auth::user()->videoMessages()->with('videos.userVideo')->get());
    }

    public static function store(Request $request)
    {
        (new self)->validate($request, [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'initial_message' => 'nullable|string|max:255',
            'source' => 'nullable|string|max:255',
            'preview' => 'nullable|string|max:255',
            'service_id' => 'required|exists:services,id',
            'user_video_id' => 'required|exists:user_videos,id',
        ]);
        $authUser = Auth::user();
        Service::where('id', $request->service_id)->where('user_id', $authUser->id)->firstOrFail();
        UserVideo::where('id', $request->user_video_id)->where('user_id', $authUser->id)->firstOrFail();
        $data = $request->only('title', 'description', 'initial_message', 'service_id', 'user_video_id');
        $data['user_id'] = $authUser->id;
        $videoMessage = VideoMessage::create($data);
        VideoMessageVideo::create([
            'video_message_id' => $videoMessage->id,
            'user_video_id' => $request->user_video_id,
        ]);
        return response()->json($videoMessage->load('videos.userVideo'));
    }
}
