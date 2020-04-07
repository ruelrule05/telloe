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

    public function postMessage(User $user, Conversation $conversation)
    {
        return $user->widget->id == $conversation->widget_id || $user->id == $conversation->user_id;
    }

    public function postNote(User $user, Conversation $conversation)
    {
        return $user->widget->id == $conversation->widget_id || $user->id == $conversation->user_id;
    }
}
