<?php

namespace App\Mail;

class DeleteBooking extends Mailer
{
    public $booking;
    public $actionText = 'View Calendar';
    public $actionUrl;
    public $emailMessage;

    public function __construct($booking)
    {
        $this->booking = $booking;
        $this->emailMessage = 'A booking has been cancelled with the following details:';
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
            ->view('emails.booking-deleted');
    }
}
