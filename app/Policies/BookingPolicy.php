<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Booking;
use Illuminate\Auth\Access\HandlesAuthorization;

class BookingPolicy
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

    public function update(User $user, Booking $booking)
    {
        return $user->id == $booking->service->user_id || $user->id == $booking->user_id || ($booking->contact &&$user->id == $booking->contact->user_id);
    }


    public function delete(User $user, Booking $booking)
    {
        return $user->id == $booking->service->user_id || $user->id == $booking->user_id || ($booking->contact &&$user->id == $booking->contact->user_id);
    }

}
