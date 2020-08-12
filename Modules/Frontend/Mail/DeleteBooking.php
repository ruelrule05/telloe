<?php

namespace Modules\Frontend\Mail;

use Modules\Frontend\Mail\Mailer;
use Auth;

class DeleteBooking extends Mailer
{
    public $booking;
    public $actionText = 'View Calendar';
    public $actionUrl;
    public $email;
    public $emailMessage;

    public function __construct($booking)
    {
        $this->booking = $booking;
        if(Auth::user()->id == $booking['user_id']) : // if contact - send to client
            $this->email = $booking['service']['user']['email'];
            $this->emailMessage = "A booking with the following details has been deleted:";
        elseif(Auth::user()->id == $booking['service']['user_id']) : // if client - send to contact
            $this->email = $booking['user']['email'];
            $this->emailMessage = "A booking for your account with the following details has been deleted:";
        endif;
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
            ->view('frontend::emails.booking-deleted');
    }
}
