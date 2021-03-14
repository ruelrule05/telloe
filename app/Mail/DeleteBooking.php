<?php

namespace App\Mail;

class DeleteBooking extends Mailer
{
    public $booking;
    public $actionText = 'View Calendar';
    public $actionUrl;
    public $email;
    public $emailMessage;

    public function __construct($booking, $target)
    {
        $this->booking = $booking;
        if ($target == 'client') { // if contact - send to client
            if ($booking->service->user->notify_email) {
                $this->email = $booking->service->user->email;
                $full_name = $booking->user ? $booking->user->full_name : $booking->contact->full_name;
                $this->emailMessage = "<strong>{$full_name}</strong> has deleted their booking with the following details:";
            }
        } elseif ($target == 'contact') { // if client - send to contact
            if (($booking->user && $booking->user->notify_email) || ($booking->contact && $booking->contact->user->notify_email)) {
                $this->email = $booking->user ? $booking->user->email : $booking->contact->email;
                $this->emailMessage = 'A booking you made has been deleted with the following details:';
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
            ->subject('Booking Deleted')
            ->to($this->email)
            ->view('emails.booking-deleted');
    }
}
