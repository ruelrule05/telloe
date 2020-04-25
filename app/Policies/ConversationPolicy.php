<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Conversation;
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
        return $user->widget->id == $conversation->widget_id || $user->id == $conversation->user_id;
    }


    public function update(User $user, Conversation $conversation)
    {
        return $user->widget->id == $conversation->widget_id;
    }

    public function addMessage(User $user, Conversation $conversation)
    {
        return ($user->widget->id ?? null) == $conversation->widget_id || $user->id == $conversation->user_id;
    }

    public function addNote(User $user, Conversation $conversation)
    {
        return $user->widget->id == $conversation->widget_id || $user->id == $conversation->user_id;
    }

    public function addMember(User $user, Conversation $conversation)
    {
        return $user->widget->id == $conversation->widget_id || $user->id == $conversation->user_id;
    }
}
