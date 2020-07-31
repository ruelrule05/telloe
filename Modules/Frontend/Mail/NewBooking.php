<?php

namespace Modules\Frontend\Mail;

use Modules\Frontend\Mail\Mailer;
use App\Models\Booking;
use Auth;

class NewBooking extends Mailer
{
    public $booking;
    public $actionText = 'View Calendar';
    public $actionUrl;
    public $email;
    public $emailMessage;

    public function __construct(Booking $booking)
    {
        $this->booking = $booking;
        if(Auth::user()->id == $booking->user_id) : // if contact - send to client
            $this->email = $booking->service->user->email;
            $this->emailMessage = "<strong>{$booking->user->full_name}</strong> has made a booking with the following details:";
            $this->actionUrl = config('app.url') . '/dashboard/bookings/calendar';
        elseif(Auth::user()->id == $booking->service->user_id) : // if client - send to contact
            $this->email = $booking->user->email;
            $this->emailMessage = "A booking has made for your account with the following details:";
        endif;
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
            ->subject('New Booking')
            ->to($this->email)
            ->view('frontend::emails.new-booking');
    }
}
