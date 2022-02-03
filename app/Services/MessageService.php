<?php

namespace App\Services;

use App\Events\NewMessageEvent;
use App\Http\Requests\StoreMessageRequest;
use App\Models\Conversation;
use App\Models\Message;
use Auth;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Image;
use Mail;
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
        $sourceS3Path = '';
        $previewS3Path = '';
        if ($request->hasFile('source')) {
            $extension = $request->source->getClientOriginalExtension();
            $folderName = $time . '-source';
            $sourceFile = $request->file('source');
            $originalName = $request->source->getClientOriginalName();

            if ($request->type == 'video') {
                $sourceFile = public_path() . "/storage/message-media/$folderName.mp4";
                $tmpPath = sys_get_temp_dir() . '/' . $request->source->getFilename();
                compressVideo($tmpPath, $sourceFile);
            }
            $targetPath = "message-media/$folderName/$originalName";
            Storage::disk('s3')->put($targetPath, file_get_contents($sourceFile), 'public');
            $sourceS3Path = Storage::disk('s3')->url($targetPath);

            $metadata['filename'] = $originalName;
            $metadata['size'] = formatBytes($request->source->getSize(), 0);

            if ($request->type == 'image' || $request->type == 'video') {
                $folderName = $time . '-preview';
                $targetPath = "message-media/$folderName/$originalName";
                if ($request->preview) {
                    $source = $request->preview;
                    $previewFile = base64_decode(substr($source, strpos($source, ',') + 1));
                    Storage::disk('s3')->put($targetPath, $previewFile, 'public');
                    $previewS3Path = Storage::disk('s3')->url($targetPath);
                } else {
                    $img = Image::make($request->file('source'));
                    if ($img->width() > 450) {
                        $img->resize(450, null, function ($constraint) {
                            $constraint->aspectRatio();
                            $constraint->upsize();
                        });
                    }
                }
            }
        }

        $message = Message::create([
            'conversation_id' => $conversation->id,
            'user_id' => Auth::user()->id,
            'type' => $request->type,
            'message' => htmlspecialchars($request->message),
            'source' => $sourceS3Path,
            'preview' => $previewS3Path,
            'metadata' => $metadata,
            'timestamp' => $timestamp
        ]);

        //if ($request->broadcast == 'true') {
        broadcast(new NewMessageEvent($message))->toOthers();
        //}

        if (! $request->is_online) {
            $targetUser = $conversation->members()->where('user_id', '<>', Auth::user()->id)->first()->user ?? null;
            if ($targetUser && $targetUser->email && $targetUser->notify_message) {
                Mail::to($targetUser->email)->queue(new NewMessage($message));
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

    public function generateLinkPreview($id, Request $request)
    {
        $message = Message::findOrFail($id);
        $this->authorize('show', $message);

        $linkPreview = null;
        preg_match_all('!https?://\S+!', $message->message, $links);
        if (count($links) > 0 && $links[0] > 0) {
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

                $message->update([
                    'link_preview' => $linkPreview
                ]);
            }
        }

        return $linkPreview;
    }
}
