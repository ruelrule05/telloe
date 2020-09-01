<?php

namespace Modules\Frontend\Mail;

use Modules\Frontend\Mail\Mailer;
use App\Models\Booking;
use Auth;

class UpdateBooking extends Mailer
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
            echo $booking->service->user->id;
            if($booking->service->user->notify_email) :
                $this->email = $booking->service->user->email;
                $full_name = $booking->user ? $booking->user->full_name : $booking->contact->full_name;
                $this->emailMessage = "<strong>{$full_name}</strong> has modified their booking with the following details:";
                $this->actionUrl = config('app.url') . '/dashboard/bookings/calendar';
            endif;
        elseif(Auth::user()->id == $booking->service->user_id) : // if client - send to contact
            if(($booking->user && $booking->user->notify_email) || ($booking->contact && $booking->contact->user->notify_email)) :
                $this->email = $booking->user ? $booking->user->email : $booking->contact->email;
                $this->emailMessage = "A booking you made has been modified with the following details:";
            endif;
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
            ->subject('Booking Updated')
            ->to($this->email)
            ->view('frontend::emails.update-booking');
    }
}
