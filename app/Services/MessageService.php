<?php

namespace App\Services;

use App\Http\Requests\StoreMessageRequest;
use App\Models\Conversation;
use App\Models\Message;
use Auth;
use Carbon\Carbon;
use File;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Image;
use Mail;

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
        $this->authorize('show', $message);
        return response()->json($message->load('user'));
    }

    public static function store(StoreMessageRequest $request)
    {
        $timestamp = Carbon::now()->getPreciseTimestamp(3);

        $conversation = Conversation::findOrFail($request->conversation_id);

        $metadata = json_decode($request->metadata, true);

        $time = Str::random(15) . '-' . time();
        $sourceFile = null;
        $previewFile = null;
        if ($request->hasFile('source')) {
            $filename = $time . '-source';

            $srcDestination = 'storage/message-media/' . $filename;
            $sourceFile = '/' . $srcDestination;

            if ($request->type == 'video') {
                $sourceFile .= '.mp4';

                $tmpPath = sys_get_temp_dir() . '/' . $request->source->getFilename();
                compressVideo($tmpPath, public_path() . "/storage/message-media/$filename.mp4");
            } else {
                $request->file('source')->storeAs('public/message-media/', $filename);
            }

            $originalName = $request->source->getClientOriginalName();
            $metadata['filename'] = $originalName;
            $metadata['size'] = formatBytes($request->source->getSize(), 0);

            if ($request->type == 'image' || $request->type == 'video') {
                $filename = $time . '-preview';
                $previewDestination = storage_path('app/public/message-media/' . $filename);
                if ($request->preview) {
                    $source = $request->preview;
                    $preview = base64_decode(substr($source, strpos($source, ',') + 1));
                    File::put($previewDestination, $preview);
                } else {
                    $img = Image::make($request->file('source'));
                    if ($img->width() > 350) {
                        $img->resize(350, null, function ($constraint) {
                            $constraint->aspectRatio();
                            $constraint->upsize();
                        });
                    }
                    $img->save($previewDestination);
                }
                $filename = $time . '-preview';
                $previewFile = '/storage/message-media/' . $filename;
            }
        }

        $message = Message::create([
            'conversation_id' => $conversation->id,
            'user_id' => Auth::user()->id,
            'type' => $request->type,
            'message' => htmlspecialchars($request->message),
            'source' => $sourceFile,
            'preview' => $previewFile,
            'metadata' => $metadata,
            'timestamp' => $timestamp
        ]);

        if ($request->broadcast == 'true') {
            broadcast(new NewMessageEvent($message))->toOthers();
        }

        if (! $request->is_online) {
            $targetUser = $conversation->members()->where('user_id', '<>', Auth::user()->id)->first()->user ?? null;
            // if (! $targetUser || $targetUser->role->role == 'support') {
            //     Mail::to(config('app.support_email'))->queue(new NewMessage($message));
            // } elseif ($targetUser && $targetUser->email && $targetUser->notify_message) {
            //     Mail::to($targetUser->email)->queue(new NewMessage($message));
            // }
            // if ($targetUser && $targetUser->email && $targetUser->notify_message) {
            //     Mail::to($targetUser->email)->queue(new NewMessage($message));
            // }
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

    public static function delete($id)
    {
        return ;
    }

    public function generateLinkPreview($id, Request $request)
    {
        $message = Message::findOrFail($id);
        $this->authorize('show', $message);

        $linkPreview = null;
        preg_match_all('!https?://\S+!', $message->message, $links);
        if (count($links) > 0 && $links[0] > 0) {
            $preview = Http::get('https://api.linkpreview.net/?key=' . config('app.link_preview_key') . '&q=' . $links[0][0]);
            $preview = $preview->json();
            $host = parse_url($preview['url'])['host'];
            if (! isset($preview['error'])) {
                $linkPreview = '<a class="message-preview d-block rounded mt-2 mb-1 overflow-hidden text-left" target="_blank" href="' . $preview['url'] . '">';
                if ($preview['image']) {
                    $linkPreview .= '<div class="preview-image" style="background-image: url(\'' . $preview['image'] . '\')"></div>';
                }
                $linkPreview .= '<div class="p-2">';
                $linkPreview .= '<h6 class="text-body mb-1 font-weight-bolder">' . htmlspecialchars($preview['title']) . '</h6>';
                $linkPreview .= '<p class="text-body mb-1 p">' . htmlspecialchars($preview['description']) . '</p>';
                $linkPreview .= '<span class="text-gray">' . $host . '</span>';
                $linkPreview .= '</div>';
                $linkPreview .= '</a>';

                $message->update([
                    'link_preview' => $linkPreview
                ]);
            }
        }

        return response($linkPreview);
    }
}
