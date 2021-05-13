<?php

namespace App\Policies;

use App\Models\Member;
use App\Models\User;
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

    public function update(User $user, Member $member)
    {
        return $user->id == $member->user_id;
    }

    public function delete(User $user, Member $member)
    {
        return $user->id == $member->user_id;
    }

    public function assignService(User $user, Member $member)
    {
        // return true;
        return $user->id == $member->user_id;
    }
}
