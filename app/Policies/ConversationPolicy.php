<?php

namespace App\Policies;

use App\Models\Conversation;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ConversationPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function show(User $user, Conversation $conversation)
    {
        return $user->id == $conversation->user_id || $user->id == $conversation->user_id || $conversation->members()->where('user_id', $user->id)->exists() || $conversation->video_message_id;
    }

    public function update(User $user, Conversation $conversation)
    {
        return $user->id == $conversation->user_id || $user->id == $conversation->user_id || $conversation->members()->where('user_id', $user->id)->first();
    }

    public function addMessage(User $user, Conversation $conversation)
    {
        return ($user->id ?? null) == $conversation->user_id || $conversation->members()->where('user_id', $user->id)->first();
    }

    public function addNote(User $user, Conversation $conversation)
    {
        return ($user->id ?? null) == $conversation->user_id || $conversation->members()->where('user_id', $user->id)->first();
    }

    public function getNotes(User $user, Conversation $conversation)
    {
        return $user->id == $conversation->user_id || $user->id == $conversation->user_id;
    }

    public function addMember(User $user, Conversation $conversation)
    {
        return $user->id == $conversation->user_id || $user->id == $conversation->user_id;
    }

    public function call(User $user, Conversation $conversation)
    {
        return $user->id == $conversation->user_id || $conversation->members()->where('user_id', $user->id)->first();
    }
}
