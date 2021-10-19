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
        $emails = collect($bookingLink->emails)->pluck('email')->toArray();
        $bookingLinkContact = $bookingLink->whereHas('bookingLinkContacts', function ($bookingLinkContact) use ($user) {
            $bookingLinkContact->whereHas('contact', function ($contact) use ($user) {
                $contact->where('contact_user_id', $user->id);
            });
        })->exists();
        return $user->id == $bookingLink->user_id || $bookingLinkContact || in_array($user->email, $emails);
    }

    public function update(User $user, BookingLink $bookingLink)
    {
        $contactUserIds = [];
        $emails = collect($bookingLink->emails)->pluck('email')->toArray();
        $bookingLink->bookingLinkContacts->each(function ($bookingLinkContact) use (&$contactUserIds) {
            $contactUserIds[] = $bookingLinkContact->contact->contact_user_id;
        });
        return $user->id == $bookingLink->user_id || in_array($user->id, $contactUserIds) || in_array($user->email, $emails);
    }

    public function destroy(User $user, BookingLink $bookingLink)
    {
        return $user->id == $bookingLink->user_id;
    }
}

