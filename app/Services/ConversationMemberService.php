<?php

namespace App\Services;

use App\Http\Requests\StoreConversationMemberRequest;
use App\Models\Conversation;
use App\Models\ConversationMember;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConversationMemberService
{
    use AuthorizesRequests;

    public static function index()
    {
        return ;
    }

    public static function show($id)
    {
        return ;
    }

    public static function store(StoreConversationMemberRequest $request)
    {
        $conversation = Conversation::findOrFail($request->conversation_id);

        if ($request->member == Auth::user()->id) {
            return abort(403);
        }

        $member = ConversationMember::firstOrcreate([
            'conversation_id' => $conversation->id,
            'user_id' => $request->id,
        ]);

        return response()->json($member->load('user'));
    }

    public static function update($id, Request $request)
    {
        return ;
    }

    public function delete($id)
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
        return ['success' => true, 'user' => $user];
    }
}
