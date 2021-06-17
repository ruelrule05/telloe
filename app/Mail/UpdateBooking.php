<?php

namespace App\Mail;

use App\Models\Booking;
use Auth;
use Carbon\Carbon;
use Spatie\CalendarLinks\Link;

class UpdateBooking extends Mailer
{
    public $booking;
    public $actionText = 'Manage Booking';
    public $actionUrl;
    public $email;
    public $emailMessage;
    public $link;

    public function __construct(Booking $booking, $target)
    {
        $this->booking = $booking;
        $user = Auth::user();
        if ($target == 'client') { // if contact - send to client
            if ($booking->service->user->notify_email) {
                $this->email = $booking->service->coach->email;
                $this->emailMessage = 'A booking has been modified with the following details:';
            }
        } elseif ($target == 'contact') { // if client - send to contact
            if (($booking->user && $booking->user->notify_email) || ($booking->contact && $booking->contact->user->notify_email)) {
                $this->email = $booking->user ? $booking->user->email : $booking->contact->email;
                $this->emailMessage = 'A booking you made has been modified with the following details:';
            }
        }

        $this->actionUrl = config('app.url') . '?auth=login';

        $from = Carbon::parse("$booking->date $booking->start");
        $to = $from->clone()->addMinute($booking->service->duration);

        $this->link = Link::create($booking->service->name, $from, $to)
            ->description($booking->service->description);
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
            ->view('emails.update-booking');
    }
}
