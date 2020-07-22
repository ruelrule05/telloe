<?php

namespace App\Policies;

use App\Models\User;
use App\Models\ConversationMember;
use Illuminate\Auth\Access\HandlesAuthorization;

class ConversationMemberPolicy
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

    public function delete(User $user, ConversationMember $member)
    {
        return $member->conversation->widget->user_id == $user->id;
    }
}
