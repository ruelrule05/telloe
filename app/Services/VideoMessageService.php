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
use Aws\ElasticTranscoder\ElasticTranscoderClient;
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
            return VideoMessage::where('user_id', Auth::user()->id)->whereNull('video_campaign_id')->with('videos.userVideo', 'user', 'videoMessageLikes')->with('conversation', function ($conversation) {
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
            'gif_duration' => 'required|string',
            'linkedin_user' => 'nullable|string',
        ]);
        $authUser = Auth::user();
        if (! $authUser->is_premium && VideoMessage::where('user_id', $authUser->id)->count() > 9) {
            return abort(403, 'Please upgrade your account.');
        }
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
        $data = $request->only('title', 'description', 'initial_message', 'service_id', 'embed_service', 'contact_id', 'linkedin_user');
        $data['user_id'] = $authUser->id;
        $data['uuid'] = Str::uuid();
        $data['status'] = 'draft';
        $data['is_active'] = true;
        $data['initial_message'] = $request->input('initial_message');
        $timestamp = $authUser->id . '-' . time();
        $host = parse_url($request->input('gif_duration'))['host'];
        $data['link_preview'] = 'https://' . $host . '/video-messages/' . $timestamp . '/link_preview.gif';

        $shortId = $authUser->id . Str::random(6);
        while (VideoMessage::where('short_id', $shortId)->exists()) {
            $shortId = $authUser->id . Str::random(6);
        }
        $data['short_id'] = $shortId;

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

        $userVideo = $userVideos[0];
        $sourcePath = ltrim(parse_url($userVideo->source)['path'], '/');
        $credentials = [
            'region' => config('filesystems.disks.s3.region'),
            'version' => 'latest',
            'credentials' => [
                'key' =>  config('filesystems.disks.s3.key'),
                'secret' => config('filesystems.disks.s3.secret')
            ]];
        $AWSClient = new ElasticTranscoderClient($credentials);
        try {
            $AWSClient->createJob([
                'PipelineId' => config('aws.transcode.pipeline_id'),
                'Input' => ['Key' => $sourcePath],
                'Outputs' => [
                    [
                        'Key' =>   'video-messages/' . $timestamp . '/link_preview.gif',
                        'PresetId' => config('aws.transcode.preset_id'),
                        'Watermarks' => [
                            [
                                'InputKey' =>  ltrim(parse_url($request->input('gif_duration'))['path'], '/'),
                                'PresetWatermarkId' => 'BottomLeft'
                            ]
                        ]
                    ]
                ],
            ]);
        } catch (AwsException $e) {
            echo $e->getMessage();
        }

        return response()->json(VideoMessage::where('id', $videoMessage->id)->with('user', 'videos.userVideo', 'videoMessageLikes', 'contact')->with('conversation', function ($conversation) {
            $conversation->withCount('messages');
        })->first());
    }

    public static function show(VideoMessage $videoMessage)
    {
        if (! $videoMessage->is_active) {
            return abort(403);
        }
        $authUser = Auth::user();
        $videoMessage->load('user', 'videos.userVideo', 'conversation', 'service');
        $user = $videoMessage->user;
        unset($videoMessage->user);
        $videoMessage->user = $user->full_name;
        $videoMessage->user_initials = $user->initials;
        $videoMessage->user_profile_image = $user->profile_image;
        $videoMessage->username = $user->username;
        if ($authUser) {
            $videoMessage->setAttribute('video_message_like', $videoMessage->videoMessageLikes()->where('user_id', $authUser->id)->first());
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
            'linkedin_user' => 'nullable|string',
            'booking_url' => 'nullable|string',
            'gif_duration' => 'required|string',
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

        $userVideos = [];
        foreach ($request->input('user_video_ids') as $userVideoId) {
            $userVideo = UserVideo::where('id', $userVideoId)->where('user_id', $authUser->id)->first();
            $userVideos[] = $userVideo;
        }
        VideoMessageVideo::where('video_message_id', $videoMessage->id)->delete();

        foreach ($userVideos as $key => $userVideo) {
            VideoMessageVideo::create(
                [
                    'video_message_id' => $videoMessage->id,
                    'user_video_id' => $userVideo->id ?? null,
                    'order' => $key
                ]
            );
        }


        $userVideo = $videoMessage->fresh('videos')->videos()->orderBy('order', 'ASC')->where('user_video_id', '<>', null)->first()->userVideo ?? null;
        if ($userVideo) {
            $sourcePath = ltrim(parse_url($userVideo->source)['path'], '/');
            $credentials = [
                'region' => config('filesystems.disks.s3.region'),
                'version' => 'latest',
                'credentials' => [
                    'key' =>  config('filesystems.disks.s3.key'),
                    'secret' => config('filesystems.disks.s3.secret')
                ]];
            $AWSClient = new ElasticTranscoderClient($credentials);
            $host = parse_url($request->input('gif_duration'))['host'];
            $timestamp = $authUser->id . '-' . time();
            try {
                $AWSClient->createJob([
                    'PipelineId' => config('aws.transcode.pipeline_id'),
                    'Input' => ['Key' => $sourcePath],
                    'Outputs' => [
                        [
                            'Key' =>   'video-messages/' . $timestamp . '/link_preview.gif',
                            'PresetId' => config('aws.transcode.preset_id'),
                            'Watermarks' => [
                                [
                                    'InputKey' =>  ltrim(parse_url($request->input('gif_duration'))['path'], '/'),
                                    'PresetWatermarkId' => 'BottomLeft'
                                ]
                            ]
                        ]
                    ],
                ]);
            } catch (AwsException $e) {
                echo $e->getMessage();
            }
        }

        $data = $request->only('title', 'description', 'initial_mesage', 'service_id', 'is_active', 'contact_id', 'linkedin_user', 'booking_url');
        $data['initial_message'] = $request->input('initial_message');
        if (isset($data['initial_message']['message'])) {
            $linkPreview = self::generateLinkPreview($data['initial_message']['message']);
            $data['initial_message']['link_preview'] = $linkPreview;
        }
        $data['link_preview'] = 'https://' . $host . '/video-messages/' . $timestamp . '/link_preview.gif';
        $videoMessage->update($data);
        return response()->json(VideoMessage::where('id', $videoMessage->id)->with('user', 'videos.userVideo', 'videoMessageLikes', 'contact')->with('conversation', function ($conversation) {
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

    public static function incrementViews(VideoMessage $videoMessage)
    {
        if (! $videoMessage->is_active) {
            return abort(403);
        }
        $increment = false;
        $authUser = Auth::user();
        if (! $authUser || $authUser->id != $videoMessage->user_id) {
            $videoMessage->increment('views');
            broadcast(new VideoMessageStat($videoMessage));
        }
        return response()->json(['increment' => $increment]);
    }
}
