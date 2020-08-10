<?php

namespace Modules\Frontend\Mail;

use Modules\Frontend\Mail\Mailer;
use App\Models\Booking;
use Auth;

class UpcomingBooking extends Mailer
{
    public $booking;
    public $actionText = 'View Calendar';
    public $actionUrl;
    public $emailMessage;

    public function __construct(Booking $booking, $actionUrl = NULL)
    {
        $this->booking = $booking;
        $this->emailMessage = "You have an upcoming booking with the following details:";
        $this->actionUrl = $actionUrl;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $email = null;

        return $this->from(config('app.noreply_email'), config('app.name'))
            ->subject('Upcoming Booking')
            ->view('frontend::emails.upcoming-booking');
    }
}
