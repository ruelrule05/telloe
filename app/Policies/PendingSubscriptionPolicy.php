<?php

namespace App\Policies;

use App\Models\User;
use App\Models\PendingSubscription;
use Illuminate\Auth\Access\HandlesAuthorization;

class PendingSubscriptionPolicy
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

    public function show(User $user, PendingSubscription $pendingSubscription)
    {
        return $user->id == $pendingSubscription->user_id;
    }

    public function delete(User $user, PendingSubscription $pendingSubscription)
    {
        return $user->id == $pendingSubscription->user_id;
    }
}
