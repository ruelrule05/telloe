<?php

namespace App\Services;

use App\Models\Contact;
use App\Models\Conversation;
use App\Models\Service;
use App\Models\UserVideo;
use App\Models\VideoCampaign;
use App\Models\VideoCampaignVideo;
use App\Models\VideoMessage;
use App\Models\VideoMessageVideo;
use Auth;
use Aws\ElasticTranscoder\ElasticTranscoderClient;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Str;

class VideoCampaignService
{
    use ValidatesRequests;

    public static function index()
    {
        return response()->json(app('model-cache')->runDisabled(function () {
            return VideoCampaign::with('videoMessages.videos.userVideo', 'videoMessages.videoMessageLikes', 'videoMessages.contact', 'videoMessages.videos.userVideo', 'videoCampaignVideos.userVideo')->where('user_id', Auth::user()->id)->with('videoMessages.conversation', function ($conversation) {
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
            'gif_duration' => 'nullable|string|max:255',
            'linkedin_user' => 'nullable|string',
            'email_template' => 'nullable|string',

        ]);
        $authUser = Auth::user();

        if ($request->input('service_id')) {
            Service::where('id', $request->input('service_id'))->where('user_id', $authUser->id)->firstOrFail();
        }

        $userVideos = [];
        foreach ($request->input('user_video_ids') as $userVideoId) {
            if ($userVideoId != 'blank') {
                $userVideo = UserVideo::where('id', $userVideoId)->where('user_id', $authUser->id)->firstOrFail();
                $userVideos[] = $userVideo;
            } else {
                $userVideos[] = null;
            }
        }

        $data = $request->only('name', 'title', 'description', 'initial_message', 'service_id', 'contact_tags', 'email_template');
        $data['user_id'] = $authUser->id;

        $host = parse_url($request->input('gif_duration'))['host'];
        $timestamp = $authUser->id . '-' . time();
        $linkPreview = 'https://' . $host . '/video-messages/' . $timestamp . '/link_preview.gif';
        $data['link_preview'] = $linkPreview;

        $videoCampaign = VideoCampaign::create($data);

        foreach ($userVideos as $key => $userVideo) {
            VideoCampaignVideo::create([
                'video_campaign_id' => $videoCampaign->id,
                'user_video_id' => $userVideo->id ?? null,
                'order' => $key
            ]);
        }

        if ($request->input('contact_tags')) {
            $contacts = Contact::where('user_id', $authUser->id);
            $contacts = $contacts->where(function ($query) use ($request) {
                foreach ($request->input('contact_tags') as $tag) {
                    $query->orWhereJsonContains('tags', $tag);
                }
            });
            $contacts = $contacts->get();
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
            foreach ($contacts as $contact) {
                if (! VideoMessage::where('contact_id', $contact->id)->where('video_campaign_id', $videoCampaign->id)->exists()) {
                    $shortId = $authUser->id . Str::random(6);
                    while (VideoMessage::where('short_id', $shortId)->exists()) {
                        $shortId = $authUser->id . Str::random(6);
                    }

                    $data = $request->only('title', 'description', 'initial_message', 'service_id');
                    $data['contact_id'] = $contact->id;
                    $data['user_id'] = $authUser->id;
                    $data['uuid'] = Str::uuid();
                    $data['status'] = 'draft';
                    $data['is_active'] = true;
                    $data['short_id'] = $shortId;
                    $data['video_campaign_id'] = $videoCampaign->id;
                    $data['link_preview'] = $linkPreview;


                    preg_match_all('/[^{{}}]+(?=})/', $data['title'], $matches);
                    foreach ($matches[0] ?? [] as $match) {
                        $data['title'] = str_replace("{{{$match}}}", $contact->$match, $data['title']);
                    }
                    preg_match_all('/[^{{}}]+(?=})/', $data['description'], $matches);
                    foreach ($matches[0] ?? [] as $match) {
                        $data['description'] = str_replace("{{{$match}}}", $contact->$match, $data['description']);
                    }

                    if (isset($data['initial_message']['message'])) {
                        preg_match_all('/[^{{}}]+(?=})/', $data['initial_message']['message'], $matches);
                        foreach ($matches[0] ?? [] as $match) {
                            $data['initial_message']['message'] = str_replace("{{{$match}}}", $contact->$match, $data['initial_message']['message']);
                        }
                        $linkPreview = self::generateLinkPreview($data['initial_message']['message']);
                        $data['initial_message']['link_preview'] = $linkPreview;
                    }
                    $videoMessage = VideoMessage::create($data);


                    foreach ($userVideos as $key => $userVideo) {
                        VideoMessageVideo::create([
                            'video_message_id' => $videoMessage->id,
                            'user_video_id' => $userVideo->id ?? null,
                            'order' => $key
                        ]);
                    }


                    $userVideo = $videoMessage->videos()->firstWhere('user_video_id', '<>', null)->userVideo;
                    if ($userVideo) {
                        $sourcePath = ltrim(parse_url($userVideo->source)['path'], '/');
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
                    $slug = Str::random(32);
                    while (Conversation::where('slug', $slug)->exists()) {
                        $slug = Str::random(32);
                    }
                    Conversation::create([
                        'video_message_id' => $videoMessage->id,
                        'slug' => $slug
                    ]);
                }
            }
        }

        return response()->json($videoCampaign->load('videoMessages.videos.userVideo', 'videoMessages.videoMessageLikes', 'videoMessages.contact', 'videoMessages.videos.userVideo', 'videoCampaignVideos.userVideo'));
    }

    public static function update(VideoCampaign $videoCampaign, Request $request)
    {
        $authUser = Auth::user();
        if ($videoCampaign->user_id != $authUser->id) {
            return 403;
        }

        (new self)->validate($request, [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'initial_message' => 'nullable|array|max:255',
            'service_id' => 'nullable|exists:services,id',
            'user_video_ids' => 'required|array',
            'gif_duration' => 'nullable|string|max:255',
            'linkedin_user' => 'nullable|string',
            'email_template' => 'nullable|string',
        ]);
        if ($request->input('service_id')) {
            Service::where('id', $request->input('service_id'))->where('user_id', $authUser->id)->firstOrFail();
        }

        $userVideos = [];
        foreach ($request->input('user_video_ids') as $userVideoId) {
            if ($userVideoId != 'blank') {
                $userVideo = UserVideo::where('id', $userVideoId)->where('user_id', $authUser->id)->firstOrFail();
                $userVideos[] = $userVideo;
            } else {
                $userVideos[] = null;
            }
        }
        VideoCampaignVideo::where('video_campaign_id', $videoCampaign->id)->delete();

        $data = $request->only('name', 'title', 'description', 'initial_message', 'service_id', 'contact_tags', 'email_template');

        $data['user_id'] = $authUser->id;
        $host = parse_url($request->input('gif_duration'))['host'];
        $timestamp = $authUser->id . '-' . time();
        $linkPreview = 'https://' . $host . '/video-messages/' . $timestamp . '/link_preview.gif';
        echo $linkPreview;
        $data['link_preview'] = $linkPreview;
        $videoCampaign->update($data);

        foreach ($userVideos as $key => $userVideo) {
            VideoCampaignVideo::create([
                'video_campaign_id' => $videoCampaign->id,
                'user_video_id' => $userVideo->id ?? null,
                'order' => $key
            ]);
        }

        if ($request->input('contact_tags')) {
            $contacts = Contact::where('user_id', $authUser->id);
            $contacts = $contacts->where(function ($query) use ($request) {
                foreach ($request->input('contact_tags') as $tag) {
                    $query->orWhereJsonContains('tags', $tag);
                }
            });
            $contacts = $contacts->get();

            foreach ($contacts as $contact) {
                $videoMessage =  VideoMessage::where('contact_id', $contact->id)->where('video_campaign_id', $videoCampaign->id)->first();
                $data = $request->only('title', 'description', 'initial_message', 'service_id');
                $data['contact_id'] = $contact->id;
                $data['user_id'] = $authUser->id;
                $data['uuid'] = Str::uuid();
                $data['status'] = 'draft';
                $data['is_active'] = true;
                $data['video_campaign_id'] = $videoCampaign->id;
                $data['link_preview'] = $linkPreview;

                preg_match_all('/[^{{}}]+(?=})/', $data['title'], $matches);
                foreach ($matches[0] ?? [] as $match) {
                    $data['title'] = str_replace("{{{$match}}}", $contact->$match, $data['title']);
                }
                preg_match_all('/[^{{}}]+(?=})/', $data['description'], $matches);
                foreach ($matches[0] ?? [] as $match) {
                    $data['description'] = str_replace("{{{$match}}}", $contact->$match, $data['description']);
                }
                if (isset($data['initial_message']['message'])) {
                    preg_match_all('/[^{{}}]+(?=})/', $data['initial_message']['message'], $matches);
                    foreach ($matches[0] ?? [] as $match) {
                        $data['initial_message']['message'] = str_replace("{{{$match}}}", $contact->$match, $data['initial_message']['message']);
                    }
                    $linkPreview = self::generateLinkPreview($data['initial_message']['message']);
                    $data['initial_message']['link_preview'] = $linkPreview;
                }

                if (! $videoMessage) {
                    $shortId = $authUser->id . Str::random(6);
                    while (VideoMessage::where('short_id', $shortId)->exists()) {
                        $shortId = $authUser->id . Str::random(6);
                    }
                    $data['short_id'] = $shortId;
                    print_r($data);
                    $videoMessage = VideoMessage::create($data);
                    foreach ($userVideos as $key => $userVideo) {
                        VideoMessageVideo::create([
                            'video_message_id' => $videoMessage->id,
                            'user_video_id' => $userVideo->id ?? null,
                            'order' => $key
                        ]);
                    }
                } else {
                    $videoMessage->update($data);
                }

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

                $userVideo = $videoMessage->videos()->firstWhere('user_video_id', '<>', null)->userVideo;
                if ($userVideo) {
                    $sourcePath = ltrim(parse_url($userVideo->source)['path'], '/');
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

                $slug = Str::random(32);
                while (Conversation::where('slug', $slug)->exists()) {
                    $slug = Str::random(32);
                }
                Conversation::create([
                    'video_message_id' => $videoMessage->id,
                    'slug' => $slug
                ]);
            }
        }

        return response()->json($videoCampaign->load('videoMessages.videos.userVideo', 'videoMessages.videoMessageLikes', 'videoMessages.contact', 'videoMessages.videos.userVideo', 'videoCampaignVideos.userVideo'));
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
