<?php

namespace App\Services;

use App\Models\Contact;
use App\Models\Conversation;
use App\Models\ConversationMember;
use App\Models\Member;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use App\Http\Requests\StoreConversationRequest;

class ConversationService
{
    public static function index()
    {
        $conversations = Conversation::with('user', 'members.user')
            ->where(function ($query) {
                $query->where('user_id', Auth::user()->id)
                    ->orWhereHas('members', function ($members) {
                        $members->where('user_id', Auth::user()->id);
                    });
            })
            ->where(function ($query) {
                $query->has('members.user')->orHas('contact');
            })
            ->get();
        return $conversations;
    }

    public static function show($id)
    {
        return ;
    }

    public static function store(StoreConversationRequest $request)
    {
        $authUser = Auth::user();
        if (count($request->members) == 1) {
            $user = User::findOrFail($request->members[0]);
            $contact = Contact::where('user_id', $authUser->id)->where('contact_user_id', $user->id)->where('is_pending', false)->first();
            $member = Member::where('user_id', $authUser->id)->where('member_user_id', $user->id)->where('is_pending', false)->first();
            if (! $contact && ! $member) {
                return abort(403, 'No contact or member found.');
            }
            $conversation = Conversation::where('user_id', $authUser->id)->where(function ($query) use ($user) {
                $query->whereHas('members', function ($members) use ($user) {
                    $members->where('user_id', $user->id);
                });
            })->has('members', 1)->first();

            if ($conversation) {
                return response()->json($conversation->load('user', 'messages.user', 'members.user'));
            }
        }

        $error = false;
        $members = [];
        foreach ($request->members as $user_id) {
            $user = User::findOrFail($user_id);
            $contact = Contact::where('user_id', $authUser->id)->where('contact_user_id', $user->id)->first();
            $member = Member::where('user_id', $authUser->id)->where('member_user_id', $user->id)->where('is_pending', false)->first();
            if (! $contact && ! $member) {
                $error = true;
                break;
            }
            if (! in_array($user->id, $members)) {
                $members[] = $user->id;
            }
        }

        if ($error) {
            return abort(403, 'Failed creating a conversation. One of the member IDs is invalid.');
        }

        if (count($members) > 0) {
            $conversation = Conversation::create([
                'user_id' => Auth::user()->id,
            ]);
            foreach ($members as $user_id) {
                ConversationMember::create([
                    'conversation_id' => $conversation->id,
                    'user_id' => $user_id
                ]);
            }
        }

        if (! $conversation) {
            return abort(403, 'Failed creating a conversation.');
        }
        if (count($members) > 1) {
            $conversation->update(['name' => 'New group chat']);
        }

        return $conversation->load('members.user');
    }

    public static function update($id, Request $request)
    {
        return ;
    }

    public static function delete($id)
    {
        return ;
    }
}
