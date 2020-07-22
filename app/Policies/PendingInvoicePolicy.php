<?php

namespace App\Policies;

use App\Models\User;
use App\Models\PendingInvoice;
use Illuminate\Auth\Access\HandlesAuthorization;

class PendingInvoicePolicy
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

    public function show(User $user, PendingInvoice $pendingInvoice)
    {
        return $user->id == $pendingInvoice->user_id;
    }

    public function delete(User $user, PendingInvoice $pendingInvoice)
    {
        return $user->id == $pendingInvoice->user_id;
    }
}
