<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Models\Message;
use Auth;

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
        $message = Message::create([
            'conversation_id' => $conversation->id,
            'user_id' => Auth::user()->id,
            'type' => $request->type,
            'message' => $request->message,
            'timestamp' => $request->timestamp,
        ]);

        return response()->json($message);
    }
}
