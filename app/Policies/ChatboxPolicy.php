<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Chatbox;
use Illuminate\Auth\Access\HandlesAuthorization;

class ChatboxPolicy
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

    public function update(User $user, Chatbox $chatbox)
    {
        return $user->id == $chatbox->chatbot->user_id;
    }

    public function delete(User $user, Chatbox $chatbox)
    {
        return $user->id == $chatbox->chatbot->user_id;
    }


}
