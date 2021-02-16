<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\ConversationMember;
use Auth;
use App\Http\Requests\StoreConversationMemberRequest;

class ConversationMemberController extends Controller
{
    //

    public function store(StoreConversationMemberRequest $request)
    {
        $conversation = Conversation::findOrFail($request->conversation_id);
        $this->authorize('addMember', $conversation);

        if ($request->member == Auth::user()->id) {
            return abort(403);
        }

        $member = ConversationMember::firstOrcreate([
            'conversation_id' => $conversation->id,
            'user_id' => $request->id,
        ]);

        return response()->json($member->load('user'));
    }

    public function destroy($id)
    {
        $member = ConversationMember::findOrFail($id);
        $this->authorize('delete', $member);
        $conversation = $member->conversation;
        $member->delete();
        $user = null;
        if ($conversation->members()->count() == 1) {
            $user = $conversation->members()->first()->user;
            $conversation->update([
                'user_id' => $user->id
            ]);
            $conversation->members()->first()->delete();
        }
        return response()->json(['success' => true, 'user' => $user]);
    }
}
