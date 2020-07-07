<?php

namespace Modules\Frontend\Http\Controllers;

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
        $conversations = Conversation::has('members.user')->with('user', 'members.user')->where(function($query) {
            $query->where('user_id', Auth::user()->id)
                ->orWhereHas('members', function($members) {
                    $members->where('user_id', Auth::user()->id);
                });
        })->get();
    	return response()->json($conversations);
    }

    public function show($id, Request $request)
    {
        $conversation = Conversation::where(function($query){
            $query->has('members.user')->orHas('contact');
        })->with('user', 'messages.user', 'members.user')->findOrfail($id);
        $this->authorize('show', $conversation);

        //if ($request->is_read) :
            // set is_read of opposite sender
            $conversation->messages()
                ->where(function($query) {
                    $query->where('user_id', '<>', Auth::user()->id)
                        ->orWhereNull('user_id');
                })
                ->where('is_read', 0)
                ->update(['is_read' => 1]);
        //endif;

        return response()->json($conversation);
    }
    
    public function store(Request $request)
    {
        $this->validate($request, [
            'members' => 'required|array'
        ]);

        if(count($request->members) == 1) :
            $conversation = Conversation::where('user_id', Auth::user()->id)->whereHas('members', function($members) use ($request) {
                $members->whereIn('user_id', $request->members);
            })->first();
            if($conversation && $conversation->members()->count() == 1) return response()->json($conversation->load('user', 'messages.user', 'members.user'));
        endif;

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

    public function update($id, Request $request)
    {
        $conversation = Conversation::findOrfail($id);
        $this->authorize('update', $conversation);

        $custom_fields = [];
        foreach($request->custom_fields as $custom_field) :
            if($custom_field['name'] && $custom_field['value'] && isset($custom_field['is_visible'])) $custom_fields[] = $custom_field;
        endforeach;
        $conversation->update([
            'status' => $request->status,
            'name' => $request->name,
            'tags' => $request->tags,
            'custom_fields' => $custom_fields,
        ]);

        return response()->json($conversation);
    }

    public function call($id)
    {
        $conversation = Conversation::findOrFail($id);
        $this->authorize('call', $conversation);

        return view('frontend::call', compact('conversation'));
    }
}
