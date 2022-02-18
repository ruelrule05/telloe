<?php

namespace App\Services;

use App\Events\VideoMessageStat;
use App\Models\Conversation;
use App\Models\Service;
use App\Models\UserVideo;
use App\Models\VideoMessage;
use App\Models\VideoMessageLike;
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
        return response()->json(app('model-cache')->runDisabled(function () {
            return VideoMessage::where('user_id', Auth::user()->id)->with('videos.userVideo', 'user', 'videoMessageLikes')->with('conversation', function ($conversation) {
                $conversation->withCount('messages');
            })->disableCache()->latest()->get();
        }));
    }

    public static function store(Request $request)
    {
        (new self)->validate($request, [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'initial_message' => 'nullable|array|max:255',
            'service_id' => 'nullable|exists:services,id',
            'user_video_ids' => 'required|array',
            'link_preview' => 'nullable|string|max:255',
        ]);
        $authUser = Auth::user();
        if ($request->input('service_id')) {
            Service::where('id', $request->input('service_id'))->where('user_id', $authUser->id)->firstOrFail();
        }
        $userVideos = [];
        foreach ($request->input('user_video_ids') as $userVideoId) {
            $userVideo = UserVideo::where('id', $userVideoId)->where('user_id', $authUser->id)->firstOrFail();
            $userVideos[] = $userVideo;
        }
        $data = $request->only('title', 'description', 'initial_message', 'service_id', 'embed_service', 'link_preview');
        $data['user_id'] = $authUser->id;
        $data['uuid'] = Str::uuid();
        $data['status'] = 'draft';
        $data['is_active'] = true;
        $data['initial_message'] = $request->input('initial_message');
        $videoMessage = VideoMessage::create($data);
        foreach ($userVideos as $key => $userVideo) {
            VideoMessageVideo::create([
                'video_message_id' => $videoMessage->id,
                'user_video_id' => $userVideo->id,
                'order' => $key
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

        return response()->json(VideoMessage::where('id', $videoMessage->id)->with('user', 'videos.userVideo', 'videoMessageLikes')->with('conversation', function ($conversation) {
            $conversation->withCount('messages');
        })->first());
    }

    public static function show(VideoMessage $videoMessage)
    {
        if (! $videoMessage->is_active) {
            return abort(403);
        }
        $authUser = Auth::user();
        $videoMessage->load('user','videos.userVideo', 'conversation', 'service');
        $user = $videoMessage->user;
        unset($videoMessage->user);
        $videoMessage->user = $user->full_name;
        $videoMessage->username = $user->username;
        if ($authUser) {
            $videoMessage->increment('views');
            $videoMessage->setAttribute('video_message_like', $videoMessage->videoMessageLikes()->where('user_id', $authUser->id)->first());
            broadcast(new VideoMessageStat($videoMessage));
        }
        return view('video-message', compact('videoMessage'));
    }

    public static function update(VideoMessage $videoMessage, Request $request)
    {
        (new self)->validate($request, [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'initial_message' => 'nullable|array|max:255',
            'service_id' => 'nullable|exists:services,id',
            'user_video_ids' => 'required|array',
            'is_active' => 'required|boolean',
            'link_preview' => 'nullable|string|max:255',
        ]);

        $authUser = Auth::user();
        if ($videoMessage->user_id != $authUser->id) {
            return abort(403);
        }

        VideoMessageVideo::where('video_message_id', $videoMessage->id)->whereNotIn('user_video_id', $request->input('user_video_ids'))->delete();

        $userVideos = [];
        foreach ($request->input('user_video_ids') as $userVideoId) {
            $userVideo = UserVideo::where('id', $userVideoId)->where('user_id', $authUser->id)->firstOrFail();
            $userVideos[] = $userVideo;
        }

        foreach ($userVideos as $key => $userVideo) {
            VideoMessageVideo::updateOrCreate(
                [
                    'video_message_id' => $videoMessage->id,
                    'user_video_id' => $userVideo->id,
                ], 
                [
                    'order' => $key
                ]
            );
        }
        $data = $request->only('title', 'description', 'initial_mesage', 'service_id', 'is_active', 'link_preview');
        $data['initial_message'] = $request->input('initial_message');
        $videoMessage->update($data);
        return response()->json(VideoMessage::where('id', $videoMessage->id)->with('user', 'videos.userVideo', 'videoMessageLikes')->with('conversation', function ($conversation) {
            $conversation->withCount('messages');
        })->first());
    }

    public static function destroy(VideoMessage $videoMessage)
    {
        $authUser = Auth::user();
        if ($videoMessage->user_id != $authUser->id) {
            return abort(403);
        }
        $videoMessage->videos()->delete();
        $videoMessage->conversation()->forceDelete();

        return response()->json(['deleted' => $videoMessage->delete()]);
    }

    public static function toggleLike(VideoMessage $videoMessage, Request $request)
    {
        (new self)->validate($request, [
            'is_liked' => 'required|boolean',
        ]);
        $authUser = Auth::user();
        $videoMessageLike = VideoMessageLike::withTrashed()->where('user_id', $authUser->id)->where('video_message_id', $videoMessage->id)->first();
        if (! $videoMessageLike) {
            $videoMessageLike = VideoMessageLike::create([
                'user_id' => $authUser->id,
                'video_message_id' => $videoMessage->id,
                'is_liked' => $request->input('is_liked')
            ]);
        } else {
            if ($videoMessageLike->deleted_at) {
                $videoMessageLike->restore();
                $videoMessageLike->update([
                    'is_liked' => $request->input('is_liked')
                ]);
            } else {
                if ($videoMessageLike->is_liked == $request->input('is_liked')) {
                    $videoMessageLike->delete();
                    $videoMessageLike = null;
                } else {
                    $videoMessageLike->update([
                        'is_liked' => $request->input('is_liked')
                    ]);
                }
            }
        }

        broadcast(new VideoMessageStat($videoMessage));

        return response()->json($videoMessageLike);
    }

    public static function getStats(VideoMessage $videoMessage)
    {
        $authUser = Auth::user();
        if ($videoMessage->user_id != $authUser->id) {
            return abort(403);
        }

        return response()->json(app('model-cache')->runDisabled(function () use ($videoMessage) {
            return VideoMessage::where('id', $videoMessage->id)->with('videoMessageLikes')->with('conversation', function ($conversation) {
                $conversation->withCount('messages');
            })->disableCache()->first();
        }));
    }
}
