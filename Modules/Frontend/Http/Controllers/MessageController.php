<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Models\Message;
use File;
use Auth;
use Image;
use Carbon\Carbon;
use FFMpeg;
use FFMpeg\Format\Video\X264;
use Mail;
use Modules\Frontend\Mail\NewMessage;
use Illuminate\Support\Facades\Http;

class MessageController extends Controller
{
    //

    public function store(Request $request)
    {
        $timestamp = Carbon::now()->getPreciseTimestamp(3);
        $this->validate($request, [
            'conversation_id' => 'required|exists:conversations,id',
            'type' => 'required|in:text,emoji,image,audio,video,file',
            'message' => 'required',
        ]);
        $conversation = Conversation::findOrFail($request->conversation_id);
        $this->authorize('addMessage', $conversation);

        $metadata = json_decode($request->metadata, true);

        $time = time();
        $sourceFile = null;
        $previewFile = null;
        $linkPreview = null;
        if ($request->hasFile('source')) :
            $filename = $time . '-source';

            $srcDestination = 'storage/message-media/' . $filename;
            $sourceFile = '/' . $srcDestination;

            if($request->type == 'video') :
                $sourceFile .= '.mp4';

                $tmpPath = sys_get_temp_dir() . '/' . $request->source->getFilename();
                compressVideo($tmpPath, public_path()."/storage/message-media/$filename.mp4");
               /* FFMpeg::fromDisk('public')
                    ->open("message-media/$filename")
                    ->addFilter('-crf', 23)
                    ->addFilter('-preset', 'medium')
                    ->addFilter('-movflags', '+faststart')
                    ->addFilter('-vf', 'scale=-2:720,format=yuv420p')
                    ->addFilter('-b:a', '128k')
                    ->export()
                    ->toDisk('public')
                    ->inFormat(new X264('libmp3lame', 'libx264'))
                    ->save("message-media/$filename.mp4");
                File::delete(public_path($srcDestination));
                */
            else :
                $request->file('source')->storeAs('public/message-media/', $filename);
            endif;

            $originalName = $request->source->getClientOriginalName();
       /*     $extension = $request->source->getClientOriginalExtension();
            if(!$extension) :
                $extension = '.' . mime2ext($request->source->getClientMimeType());
                $originalName .= $extension;
            endif;*/
            $metadata['filename'] = $originalName;
            $metadata['size'] =  formatBytes($request->source->getSize(), 0);

            if($request->type == 'image' || $request->type == 'video') :
                $filename = $time . '-preview';
                $previewDestination = storage_path('app/public/message-media/' . $filename);
                if ($request->preview) :
                    $source = $request->preview;
                    $preview = base64_decode(substr($source, strpos($source, ',') + 1));
                    File::put($previewDestination, $preview);
                else :
                    $img = Image::make($request->file('source'));
                    if ($img->width() > 200) :
                        $img->resize(200, null, function ($constraint) {
                            $constraint->aspectRatio();
                            $constraint->upsize();
                        });
                    endif;
                    $img->save($previewDestination);
                endif;
                $filename = $time . '-preview';
                $previewFile = '/storage/message-media/' . $filename;
            endif;
        endif;

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
            
        if(!$request->is_online) :
            $targetUser = $conversation->members()->where('user_id', '<>', Auth::user()->id)->first()->user ?? NULL;
            if(!$targetUser || $targetUser->role->role == 'support') :
                Mail::to(config('app.support_email'))->queue(new NewMessage($message));
            elseif($targetUser && $targetUser->email) :
                Mail::to($targetUser->email)->queue(new NewMessage($message));
            endif;
        endif;

        return response()->json($message);
    }


    public function show($id, Request $request)
    {
        $message = Message::with('conversation')->findOrFail($id);
        $this->authorize('show', $message);
        return response()->json($message->load('user'));
    }


    public function update($id, Request $request)
    {
        $message = Message::findOrFail($id);
        $this->authorize('update', $message);
        $message->update([
            'is_history' => $request->is_history ?? false,
            'tags' => $request->tags,
        ]);
        return response()->json($message);
    }


    public function destroy($id, Request $request)
    {
        $message = Message::findOrFail($id);
        $this->authorize('delete', $message);
        $message->delete();

        return response()->json(['deleted' => true]);
    }

    public function convertVideo(Request $request)
    {
        $tmpPath = sys_get_temp_dir() . '/' . $request->video->getFilename();
        compressVideo($tmpPath, $tmpPath . '.mp4');
        /*FFMpeg::fromDisk('root')
            ->open($tmpPath)
            ->addFilter('-crf', 23)
            ->addFilter('-preset', 'medium')
            ->addFilter('-movflags', '+faststart')
            ->addFilter('-vf', 'scale=-2:720,format=yuv420p')
            ->addFilter('-b:a', '128k')
            ->export()
            ->inFormat(new X264('libmp3lame', 'libx264'))
            ->save($tmpPath . '.mp4');*/

        //$file = file_get_contents($tmpPath . '.mp4');
        return response()->download($tmpPath)->deleteFileAfterSend();

        
        // Delete tmp file MP4
        // File::delete($tmpPath . '.mp4');
    }

    public function getPagePreview(Request $request)
    {
        $this->validate($request, [
            'url' => 'required'
        ]);
        $preview = Http::get('http://api.linkpreview.net/?key=' . config('app.link_preview_key').'&q=' . $request->url);

        return response($response);
    }

    public function generateLinkPreview($id, Request $request)
    {
        $message = Message::findOrFail($id);
        $this->authorize('show', $message);

        $linkPreview = null;
        preg_match_all('!https?://\S+!', $message->message, $links);
        if(count($links) > 0 && $links[0] > 0) :
            $preview = Http::get('https://api.linkpreview.net/?key=' . config('app.link_preview_key').'&q=' . $links[0][0]);
            $preview = $preview->json();
            $host = parse_url($preview['url'])['host'];
            if(!isset($preview['error'])) :
                $linkPreview = '<a class="message-preview d-block rounded mt-2 mb-1 overflow-hidden text-left" target="_blank" href="' . $preview['url'] . '">';
                if($preview['image']) :
                    $linkPreview .= '<div class="preview-image" style="background-image: url(\'' . $preview['image'] . '\')"></div>';
                endif;
                $linkPreview .= '<div class="p-2">';
                $linkPreview .= '<h6 class="text-body mb-1 font-weight-bolder">' . htmlspecialchars($preview['title']) . '</h6>';
                $linkPreview .= '<p class="text-body mb-1 p">' . htmlspecialchars($preview['description']) . '</p>';
                $linkPreview .= '<span class="text-gray">' . $host . '</span>';
                $linkPreview .= '</div>';
                $linkPreview .= '</a>';

                $message->update([
                    'link_preview' => $linkPreview
                ]);
            endif;
        endif;
        
        return response($linkPreview);
    }
}
