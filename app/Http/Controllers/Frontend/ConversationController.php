<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Models\Message;
use Auth;
use File;

class ConversationController extends Controller
{
    public function index(Request $request)
    {
    	$conversations = Conversation::where('widget_id', Auth::user()->widget->id)->get();
    	return response()->json($conversations);
    }

    public function show($id, Request $request)
    {
    	$conversation = Conversation::with('messages')->findOrfail($id);
    	$this->authorize('show', $conversation);

    	if ($conversation && $request->is_read) :
            // set is_read of opposite sender
            $conversation->messages()
                ->where(function($query) {
                    $query->where('user_id', '<>', Auth::user()->id)
                        ->orWhereNull('user_id');
                })
                ->where('is_read', 0)
                ->update(['is_read' => 1]);
        endif;

        return response()->json($conversation);
    }

    public function postMessage($id, Request $request)
    {
        $this->validate($request, [
            'type' => 'required',
            'timestamp' => 'required',
        ]);
        $conversation = Conversation::findOrFail($id);
        $this->authorize('postMessage', $conversation);

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

        return response()->json($message);
    }

    public function updateMessage($id, Request $request)
    {
        $message = Message::findOrFail($id);
        $this->authorize('update', $message);
        $message->update([
            'is_history' => $request->is_history
        ]);
        return response()->json($message);
    }
}
