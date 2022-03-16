<?php

namespace App\Services;

use App\Events\VideoMessageStat;
use App\Models\Contact;
use App\Models\Conversation;
use App\Models\Service;
use App\Models\UserVideo;
use App\Models\VideoMessage;
use App\Models\VideoMessageLike;
use App\Models\VideoMessageVideo;
use Auth;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
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
            'contact_id' => 'nullable|exists:contacts,id',
            'user_video_ids' => 'required|array',
            'link_preview' => 'nullable|string|max:255',
        ]);
        $authUser = Auth::user();
        if ($request->input('service_id')) {
            Service::where('id', $request->input('service_id'))->where('user_id', $authUser->id)->firstOrFail();
        }
        if ($request->input('contact_id')) {
            Contact::where('id', $request->input('contact_id'))->where('user_id', $authUser->id)->firstOrFail();
        }
        $userVideos = [];
        foreach ($request->input('user_video_ids') as $userVideoId) {
            $userVideo = UserVideo::where('id', $userVideoId)->where('user_id', $authUser->id)->firstOrFail();
            $userVideos[] = $userVideo;
        }
        $data = $request->only('title', 'description', 'initial_message', 'service_id', 'embed_service', 'link_preview', 'contact_id');
        $data['user_id'] = $authUser->id;
        $data['uuid'] = Str::uuid();
        $data['status'] = 'draft';
        $data['is_active'] = true;
        $data['initial_message'] = $request->input('initial_message');
        if (isset($data['initial_message']['message'])) {
            $linkPreview = self::generateLinkPreview($data['initial_message']['message']);
            $data['initial_message']['link_preview'] = $linkPreview;
        }

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
        $videoMessage->user_initials = $user->initials;
        $videoMessage->user_profile_image = $user->profile_image;
        $videoMessage->username = $user->username;
        if ($authUser && $authUser->id != $videoMessage->user_id) {
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
            'contact_id' => 'nullable|exists:contacts,id',
            'user_video_ids' => 'required|array',
            'is_active' => 'required|boolean',
            'link_preview' => 'nullable|string|max:255',
        ]);

        $authUser = Auth::user();

        if ($videoMessage->user_id != $authUser->id) {
            return abort(403);
        }
        if ($request->input('service_id')) {
            Service::where('id', $request->input('service_id'))->where('user_id', $authUser->id)->firstOrFail();
        }
        if ($request->input('contact_id')) {
            Contact::where('id', $request->input('contact_id'))->where('user_id', $authUser->id)->firstOrFail();
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
        $data = $request->only('title', 'description', 'initial_mesage', 'service_id', 'is_active', 'link_preview', 'contact_id');
        $data['initial_message'] = $request->input('initial_message');
        if (isset($data['initial_message']['message'])) {
            $linkPreview = self::generateLinkPreview($data['initial_message']['message']);
            $data['initial_message']['link_preview'] = $linkPreview;
        }
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
        $videoMessage->videoMessageLikes()->forceDelete();

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
        if ($authUser) {
            broadcast(new VideoMessageStat($videoMessage));
        }

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

    protected static function generateLinkPreview($message)
    {
        $linkPreview = null;
        preg_match_all('@((https?://)?([-\\w]+\\.[-\\w\\.]+)+\\w(:\\d+)?(/([-\\w/_\\.]*(\\?\\S+)?)?)*)@', $message, $links);
        if (isset($links[0][0])) {
            $preview = Http::get('https://api.linkpreview.net/?key=' . config('app.link_preview_key') . '&q=' . $links[0][0]);
            $preview = $preview->json();
            if (! isset($preview['error'])) {
                $host = parse_url($preview['url'])['host'];
                $linkPreview = '<a target="_blank" href="' . $preview['url'] . '">';
                if ($preview['image']) {
                    $linkPreview .= '<div class="preview-image" style="background-image: url(\'' . $preview['image'] . '\')"></div>';
                }
                $linkPreview .= '<h6 class="preview-title">' . htmlspecialchars($preview['title']) . '</h6>';
                $linkPreview .= '<p class="preview-description">' . htmlspecialchars($preview['description']) . '</p>';
                $linkPreview .= '<span class="preview-host">' . $host . '</span>';
                $linkPreview .= '</a>';
            }
        }

        return $linkPreview;
    }
}
