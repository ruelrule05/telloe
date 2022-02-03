<?php

namespace App\Services;

use App\Models\Conversation;
use App\Models\Service;
use App\Models\UserVideo;
use App\Models\VideoMessage;
use App\Models\VideoMessageVideo;
use Auth;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Str;

class VideoMessageService
{
    use ValidatesRequests;

    public static function index(Request $request)
    {
        return response()->json(Auth::user()->videoMessages()->with('videos.userVideo', 'user')->get());
    }

    public static function store(Request $request)
    {
        (new self)->validate($request, [
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'initial_message' => 'required|string|max:255',
            'service_id' => 'required|exists:services,id',
            'user_video_ids' => 'required|array',
            'embed_service' => 'nullable|boolean',
        ]);
        $authUser = Auth::user();
        Service::where('id', $request->service_id)->where('user_id', $authUser->id)->firstOrFail();
        $userVideos = [];
        foreach ($request->input('user_video_ids') as $userVideoId) {
            $userVideo = UserVideo::where('id', $userVideoId)->where('user_id', $authUser->id)->firstOrFail();
            $userVideos[] = $userVideo;
        }
        $data = $request->only('title', 'description', 'initial_message', 'service_id', 'embed_service');
        $data['user_id'] = $authUser->id;
        $data['uuid'] = Str::uuid();
        $data['status'] = 'draft';
        $videoMessage = VideoMessage::create($data);
        foreach ($userVideos as $userVideo) {
            VideoMessageVideo::create([
                'video_message_id' => $videoMessage->id,
                'user_video_id' => $userVideo->id,
            ]);
        }
        $slug = Str::random(32);
        while (Conversation::where('slug', $slug)->exists()) {
            $slug = Str::random(32);
        }
        Conversation::create([
            'video_message_id' => $videoMessage->id,
            'slug' => $slug
        ]);
        return response()->json($videoMessage->load('user', 'videos.userVideo'));
    }

    public static function show(VideoMessage $videoMessage)
    {
        if ($videoMessage->status != 'published') {
            return abort(403);
        }
        $videoMessage->load('user','videos.userVideo', 'conversation', 'service');
        $user = $videoMessage->user;
        unset($videoMessage->user);
        $videoMessage->user = $user->full_name;
        $videoMessage->username = $user->username;
        return view('video-message', compact('videoMessage'));
    }

    public static function setStatus(VideoMessage $videoMessage, Request $request)
    {
        (new self)->validate($request, [
            'status' => 'required|in:draft,published',
        ]);
        $authUser = Auth::user();
        if ($videoMessage->user_id != $authUser->id) {
            return abort(403);
        }
        $videoMessage->update([
            'status' => $request->input('status')
        ]);
        return response()->json($videoMessage->load('videos.userVideo'));
    }

    public static function destroy(VideoMessage $videoMessage)
    {
        $authUser = Auth::user();
        if ($videoMessage->user_id != $authUser->id) {
            return abort(403);
        }
        $videoMessage->videos()->delete();
        $videoMessage->conversation()->delete();
        return response()->json(['deleted' => $videoMessage->delete()]);
    }
}
