<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Chatbot;
use Illuminate\Auth\Access\HandlesAuthorization;

class ChatbotPolicy
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

    public function show(User $user, Chatbot $chatbot)
    {
        return $user->id == $chatbot->user_id;
    }


    public function update(User $user, Chatbot $chatbot)
    {
        return $user->id == $chatbot->user_id;
    }


    public function delete(User $user, Chatbot $chatbot)
    {
        return $user->id == $chatbot->user_id;
    }

    
    public function create_chatbox(User $user, Chatbot $chatbot)
    {
        return $user->id == $chatbot->user_id;
    }
}
