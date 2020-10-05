<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Member;
use Illuminate\Auth\Access\HandlesAuthorization;

class MemberPolicy
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
    
    public function show(User $user, Member $member)
    {
        return $user->id == $member->user_id;
    }

    public function delete(User $user, Member $member)
    {
        return $user->id == $member->user_id;
    }
}
