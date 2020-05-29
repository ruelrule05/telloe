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
            $conversations = Conversation::with('members.user')->where('widget_id', Auth::user()->widget->id)->get();
        elseif($role == 'customer'):
            $conversations = Conversation::with('members.user')->where(function($query) {
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
        $conversation = Conversation::create([
            'widget_id' => Auth::user()->widget->id,
            'user_id' => $request->user_id,
            'members' => $request->members,
            'status' => 'active',
        ]);
        if(count($request->members) > 1) :
            $added_members = [];
            foreach($request->members as $member_id) :
                if(!in_array($member_id, $added_members)) :
                    $added_member[] = $member_id;
                    if($member_id != Auth::user()->id) :
                        $member = User::find($member_id);
                        if($member) :
                            ConversationMember::create([
                                'conversation_id' => $conversation->id,
                                'user_id' => $member->id
                            ]);
                        endif;
                    endif;
                endif;
            endforeach;
            $conversation->update(['name' => 'New group chat']);
        else :
            $member = User::find($request->members[0]);
            if($member) :
                $conversation->update([
                    'user_id' => $member->id
                ]);
            endif;
        endif;
        return response()->json($conversation->load('members.user'));
    }

    public function show($id, Request $request)
    {
    	$conversation = Conversation::with('messages', 'notes', 'members.user')->findOrfail($id);
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
}
