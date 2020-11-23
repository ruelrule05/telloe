<?php

namespace App\Policies;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ContactPolicy
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

    public function create_invoice(User $user, Contact $contact)
    {
        return $user->id == $contact->user_id;
    }

    public function finalize_invoice(User $user, Contact $contact)
    {
        return $user->id == $contact->user_id;
    }

    public function create_subscription(User $user, Contact $contact)
    {
        return $user->id == $contact->user_id;
    }

    public function cancel_subscription(User $user, Contact $contact)
    {
        return $user->id == $contact->user_id;
    }

    public function show(User $user, Contact $contact)
    {
        return $user->id == $contact->user_id;
    }

    public function update(User $user, Contact $contact)
    {
        return $user->id == $contact->user_id;
    }

    public function delete(User $user, Contact $contact)
    {
        return $user->id == $contact->user_id;
    }
}
