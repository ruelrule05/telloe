<?php

namespace App\Mail;

use Auth;

class NewBooking extends Mailer
{
    public $actionText = 'Manage Booking';
    public $actionUrl;
    public $email;
    public $emailMessage;
    public $names;
    public $bookings;

    public function __construct(array $bookings, $target, $bookingUserEmail = null, $userTriggered = false)
    {
        $authUser = $authUser ?? Auth::user();
        $this->bookings = $bookings;
        $this->names = $bookings[0]->bookingUsers->map(function ($bookingUser) {
            return $bookingUser->user ? $bookingUser->user->full_name : $bookingUser->guest['email'];
        })->toArray();
        $this->actionText = 'Manage Bookings';
        $this->actionUrl = config('app.url') . '?auth=login';

        if ($target == 'serviceUser') {
            $this->email = $bookings[0]->service->coach->email;
            $this->emailMessage = 'A booking has been made with the following details:';
        } elseif ($target == 'customer') {
            $this->email = $bookingUserEmail;
            if ($userTriggered) {
                $this->emailMessage = "You successfully booked an event <strong>\"{$bookings[0]->service->name}\"</strong> with <strong>{$bookings[0]->service->coach->full_name}</strong>.";
            } else {
                $this->emailMessage = 'A booking has been made for your email with the following details:';
                // $this->actionUrl = url("/?invite_token={$bookings[0]->contact->invite_token}&auth=signup");
                // $this->actionText = 'Create an account';
            }
        }
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(config('app.noreply_email'), config('app.name'))
            ->subject('New Booking')
            ->to($this->email)
            ->view('emails.new-booking');
    }
}
