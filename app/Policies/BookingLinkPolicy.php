<?php

namespace App\Policies;

use App\Models\BookingLink;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class BookingLinkPolicy
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

    public function show(User $user, BookingLink $bookingLink)
    {
        $bookingLinkContact = $bookingLink->whereHas('bookingLinkContacts', function ($bookingLinkContact) use ($user) {
            $bookingLinkContact->whereHas('contact', function ($contact) use ($user) {
                $contact->where('contact_user_id', $user->id);
            });
        })->exists();
        return $user->id == $bookingLink->user_id || $bookingLinkContact;
    }
}

