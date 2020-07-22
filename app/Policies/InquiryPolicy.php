<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Inquiry;
use Illuminate\Auth\Access\HandlesAuthorization;

class InquiryPolicy
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

    public function show(User $user, Inquiry $inquiry)
    {
        return $user->widget->id == $inquiry->widget_id || $user->id == $inquiry->user_id;
    }

    public function postMessage(User $user, Inquiry $inquiry)
    {
        return $inquiry->widget_id == $user->widget->id || $user->id == $inquiry->user_id;
    }
}
