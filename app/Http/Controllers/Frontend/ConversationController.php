<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Conversation;
use Auth;

class ConversationController extends Controller
{
    public function index(Request $request)
    {
    	$conversations = Conversation::with('user')->where('widget_id', Auth::user()->widget->id)->get();
    	return response()->json($conversations);
    }

    public function show($id, Request $request)
    {
    	$conversation = Conversation::with('user', 'messages.user')->findOrfail($id);
    	$this->authorize('show', $conversation);

    	if ($conversation && $request->is_read) :
            // set is_read of opposite sender
            $conversation->messages()
                ->where('user_id', '<>', Auth::user()->id)
                ->where('is_read', 0)
                ->update(['is_read' => 1]);
        endif;

        return response()->json($conversation);
    }
}
