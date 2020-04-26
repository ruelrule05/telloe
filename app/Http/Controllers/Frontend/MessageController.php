<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Models\Message;
use File;
use Auth;

class MessageController extends Controller
{
    //

    public function store(Request $request)
    {
        $this->validate($request, [
            'conversation_id' => 'required|exists:conversations,id',
            'type' => 'required',
            'timestamp' => 'required',
        ]);
        $conversation = Conversation::findOrFail($request->conversation_id);
        $this->authorize('addMessage', $conversation);

        $time = time();
        $sourceFile = null;
        if ($request->hasFile('source')) :
            $filename = $time . '-source';
            $srcDestination = 'storage/message-media/' . $filename;
            $request->file('source')->storeAs('public/message-media/', $filename);
            $sourceFile = '/' . $srcDestination;
        endif;

        $previewFile = null;
        if ($request->preview) :
            $source = $request->preview;
            $filename = $time . '-preview';
            $previewDestination = 'storage/message-media/' . $filename;
            $preview = base64_decode(substr($source, strpos($source, ',') + 1));
            File::put($previewDestination, $preview);
            $previewFile = '/' . $previewDestination;
        endif;

        $message = Message::create([
            'conversation_id' => $conversation->id,
            'user_id' => Auth::user()->id,
            'type' => $request->type,
            'message' => $request->message,
            'timestamp' => $request->timestamp,
            'source' => $sourceFile,
            'preview' => $previewFile,
            'metadata' => json_decode($request->metadata),
        ]);
        $response = [
            'id' => $message->id,
            'conversation' => [
                'id' => $conversation->id,
                'user_id' => $conversation->user_id,
                'members' => $conversation->members()->pluck('user_id')->toArray(),
                'widget' => [
                    'id' => $conversation->widget->id,
                    'user_id' => $conversation->widget->user_id
                ],
            ],
        ];

        return response()->json($response);
    }



    public function update($id, Request $request)
    {
        $message = Message::findOrFail($id);
        $this->authorize('update', $message);
        $message->update([
            'is_history' => $request->is_history
        ]);
        return response()->json($message);
    }

    public function show($id, Request $request)
    {
        $message = Message::with('conversation')->findOrFail($id);
        $this->authorize('show', $message);
        return response()->json($message);
    }
}
