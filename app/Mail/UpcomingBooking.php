<?php

namespace App\Mail;

use App\Models\Booking;

class UpcomingBooking extends Mailer
{
    public $booking;
    public $actionText = 'View Calendar';
    public $actionUrl;
    public $emailMessage;
    public $full_name;

    public function __construct(Booking $booking, $full_name = '', $actionUrl = null)
    {
        $this->booking = $booking;
        $this->emailMessage = 'You have an upcoming booking with the following details:';
        $this->full_name = $full_name;
        $this->actionUrl = $actionUrl;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(config('app.noreply_email'), config('app.name'))
            ->subject('Upcoming Booking')
            ->view('emails.upcoming-booking');
    }
}