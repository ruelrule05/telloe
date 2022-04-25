<?php

namespace App\Services;

use App\Events\NewMessageEvent;
use App\Events\VideoMessageStat;
use App\Http\Requests\StoreMessageRequest;
use App\Jobs\SendNewMessageMail;
use App\Mail\VideoMessageComment;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\VideoMessage;
use Auth;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Image;
use Mail;
use Stevebauman\Location\Facades\Location;
use Storage;

class MessageService
{
    use AuthorizesRequests;

    public static function index()
    {
        return ;
    }

    public function show($id)
    {
        $message = Message::with('conversation')->findOrFail($id);
        if (! $message->conversation->video_message_id) {
            $this->authorize('show', $message);
        }
        return response()->json($message->load('user'));
    }

    public static function store(StoreMessageRequest $request)
    {
        $timestamp = Carbon::now()->getPreciseTimestamp(3);

        $conversation = Conversation::findOrFail($request->conversation_id);
        $authUser = Auth::user();
        if (! $authUser && ! $conversation->video_message_id) {
            return abort(403);
        }

        $metadata = json_decode($request->metadata, true);

        $location = null;
        if (! $authUser) {
            $ip = $request->ip();
            $response = Http::get('https://api.ipify.org', [
                'format' => 'json',
                'callback' => '?'
            ]);
            if ($response->successful()) {
                $response = $response->json();
                if (isset($response['ip'])) {
                    $ip = $response['ip'];
                }
            }
            $location = Location::get($ip);
        }
        $linkPreview = (new self)::generateLinkPreview($request);
        $message = Message::create([
            'conversation_id' => $conversation->id,
            'user_id' => $authUser->id ?? null,
            'type' => $request->type,
            'message' => htmlspecialchars($request->message),
            'source' => $request->source,
            'preview' => $request->preview,
            'metadata' => $metadata,
            'timestamp' => $timestamp,
            'location' => $location,
            'link_preview' => $linkPreview
        ]);

        //if ($request->broadcast == 'true') {
        broadcast(new NewMessageEvent($message))->toOthers();

        if ($conversation->video_message_id) {
            $videoMessage = VideoMessage::find($conversation->video_message_id);
            if ($videoMessage) {
                broadcast(new VideoMessageStat($videoMessage));
                if(!$conversation->email_sent_at || Carbon::now()->diffInMinutes(Carbon::parse($conversation->email_sent_at)) >= 5) {
                    Mail::to($videoMessage->user->email)->send(new VideoMessageComment($videoMessage));
                    $conversation->update([
                        'email_sent_at' => Carbon::now()
                    ]);
                }
            }
        }

        //}

        if (!$conversation->video_message_id && ! $request->is_online) {
            $targetUser = $conversation->members()->where('user_id', '<>', Auth::user()->id)->first()->user ?? null;
            if ($targetUser && $targetUser->email && $targetUser->notify_message) {
                new SendNewMessageMail($message, $targetUser->email);
            }
        }

        return $message;
    }

    public static function update($id, Request $request)
    {
        $message = Message::findOrFail($id);
        //$this->authorize('update', $message);
        $message->update([
            'tags' => $request->tags,
        ]);
        return $message;
    }

    public static function destroy($id)
    {
        $message = Message::findOrFail($id);
        (new self)->authorize('delete', $message);
        return $message->delete();
    }

    public static function generateLinkPreview(Request $request)
    {
        // $message = Message::findOrFail($id);
        // $this->authorize('show', $message);

        $linkPreview = null;


        preg_match_all('@((https?://)?([-\\w]+\\.[-\\w\\.]+)+\\w(:\\d+)?(/([-\\w/_\\.]*(\\?\\S+)?)?)*)@', $request->input('message'), $links);
        if (count($links) > 0 && count($links[0]) > 0) {
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

                // $message->update([
                //     'link_preview' => $linkPreview
                // ]);
            }
        }

        return $linkPreview;
    }
}
