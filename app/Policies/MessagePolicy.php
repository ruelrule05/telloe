<?php

namespace App\Policies;

use App\Models\Message;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MessagePolicy
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

    public function show(User $user, Message $message)
    {
        return $message->conversation->user_id == $user->id || $message->user_id == $user->id || in_array($user->id, $message->conversation->members()->pluck('user_id')->toArray()) || $message->conversation->video_message_id;
        ;
    }

    public function update(User $user, Message $message)
    {
        return $message->conversation->user_id == $user->id;
    }

    public function delete(User $user, Message $message)
    {
        return $message->user_id == $user->id;
    }
}
