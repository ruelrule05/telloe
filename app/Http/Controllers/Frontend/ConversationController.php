<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Models\User;
use App\Models\Message;
use App\Models\ConversationMember;
use Auth;
use File;

class ConversationController extends Controller
{
    public function index(Request $request)
    {
        $role = Auth::user()->role->role;
        if($role == 'client') :
            $conversations = Conversation::has('members.user')->with('user', 'members.user')->where('user_id', Auth::user()->id)->get();
        elseif($role == 'customer'):
            $conversations = Conversation::has('members.user')->with('user', 'members.user')->where(function($query) {
                $query->where('user_id', Auth::user()->id)
                    ->orWhereHas('members', function($members) {
                        $members->where('user_id', Auth::user()->id);
                    });
            })->get();
        endif;
    	return response()->json($conversations);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'members' => 'required|array'
        ]);
        $conversation = Conversation::create([
            'user_id' => Auth::user()->id,
            'status' => 'active',
        ]);

        $members = [];
        foreach($request->members as $member_id) :
            if(!in_array($member_id, $members)) :
                if($member_id != Auth::user()->id) :
                    $member = User::find($member_id);
                    if($member) :
                        $members[] = $member->id;
                        ConversationMember::create([
                            'conversation_id' => $conversation->id,
                            'user_id' => $member->id
                        ]);
                    endif;
                endif;
            endif;
        endforeach;
        if(count($members) > 1) $conversation->update(['name' => 'New group chat']);
       
        return response()->json($conversation->load('members.user'));
    }

    public function show($id, Request $request)
    {
    	$conversation = Conversation::has('members.user')->with('user', 'messages', 'notes', 'members.user')->findOrfail($id);
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
            'status' => $request->status,
            'name' => $request->name,
            'tags' => $request->tags,
        ]);

        return response()->json($conversation);
    }

    public function call($id, $action)
    {
        $actions = ['incoming', 'outgoing'];
        if(array_search($action, $actions) === FALSE) return abort(404);

        $conversation = Conversation::findOrFail($id);
        $this->authorize('call', $conversation);
        $caller = Auth::user();
        $callee = $conversation->member;

        if($action == 'incoming') :
            list($caller, $callee) = [$callee, $caller];
        endif;

        return view('frontend.call', compact('action', 'caller', 'callee', 'conversation'));
    }
}
