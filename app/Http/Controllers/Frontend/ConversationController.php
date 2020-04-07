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
    	$conversation = Conversation::with('messages', 'notes')->findOrfail($id);
    	$this->authorize('show', $conversation);

    	if ($request->is_read) :
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

    public function update($id, Request $request)
    {
        $conversation = Conversation::findOrfail($id);
        $this->authorize('update', $conversation);

        $conversation->update([
            'status' => $request->status
        ]);

        return response()->json($conversation);
    }
}
