<?php

namespace App\Policies;

use App\Models\Booking;
use App\Models\User;
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

    public function createZoomLink(User $user, Booking $booking)
    {
        return
            $user->id == $booking->service->user_id ||
            $user->id == $booking->user_id ||
            ($booking->service->parentService && $booking->service->parentService->user_id == $user->id);
    }

    public function update(User $user, Booking $booking)
    {
        return
            $user->id == ($booking->service && $booking->service->user_id) ||
            $user->id == ($booking->bookingLink && $booking->bookingLink->user_id) ||
            $user->id == $booking->user_id ||
            ($booking->service && $booking->service->parentService && $booking->service->parentService->user_id == $user->id) ||
            ($booking->contact && $user->id == $booking->contact->contact_user_id);
    }

    public function delete(User $user, Booking $booking)
    {
        return
            $user->id == $booking->service->user_id ||
            $user->id == $booking->user_id ||
            ($booking->service->parentService && $booking->service->parentService->user_id == $user->id) ||
            ($booking->contact && $user->id == $booking->contact->contact_user_id);
    }
}
