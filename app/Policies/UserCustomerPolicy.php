<?php

namespace App\Policies;

use App\Models\User;
use App\Models\UserCustomer;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserCustomerPolicy
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

    public function create_invoice(User $user, UserCustomer $userCustomer)
    {
        return $user->id == $userCustomer->user_id;
    }

    public function finalize_invoice(User $user, UserCustomer $userCustomer)
    {
        return $user->id == $userCustomer->user_id;
    }

    public function create_subscription(User $user, UserCustomer $userCustomer)
    {
        return $user->id == $userCustomer->user_id;
    }

    public function delete(User $user, UserCustomer $userCustomer)
    {
        return $user->id == $userCustomer->user_id;
    }
}
