<?php

namespace Modules\Frontend\Mail;

use Modules\Frontend\Mail\Mailer;
use App\Models\Booking;
use App\Models\User;
use Auth;

class NewBooking extends Mailer
{
    public $booking;
    public $actionText = 'View Calendar';
    public $actionUrl;
    public $email;
    public $emailMessage;

    public function __construct(Booking $booking, User $authUser = null)
    {
        $this->booking = $booking;
        $authUser = $authUser ?? Auth::user();
        if($authUser->id == $booking->user_id) : // if contact - send to client
            $this->email = $booking->service->user->email;
            $this->emailMessage = "<strong>{$booking->user->full_name}</strong> has made a booking with the following details:";
            $this->actionUrl = config('app.url') . '/dashboard/bookings/calendar?date=' . $booking->date;
        elseif($authUser->id == $booking->service->user_id) : // if client - send to contact
            $this->email = $booking->user->email;
            $this->emailMessage = "A booking has been made for your account with the following details:";
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
            ->subject('New Booking')
            ->to($this->email)
            ->view('frontend::emails.new-booking');
    }
}
