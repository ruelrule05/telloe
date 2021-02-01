<?php

namespace Modules\Frontend\Mail;

use Auth;
use Carbon\Carbon;
use Spatie\CalendarLinks\Link;

class NewBooking extends Mailer
{
    public $bookings;
    public $actionText = 'Manage Booking';
    public $actionUrl;
    public $email;
    public $emailMessage;

    public function __construct(array $bookings, $target)
    {
        $this->bookings = $bookings;
        $booking = $this->bookings[0];
        $authUser = $authUser ?? Auth::user();
        if ($target == 'client') { // if contact - send to client
            $this->email = $booking->service->coach->email;
            $this->emailMessage = 'A booking has been made with the following details:';
        } elseif ($target == 'contact') { // if client - send to contact
            $this->email = $booking->customer->email;
            $this->emailMessage = "<strong>{$booking->service->user->full_name}</strong> made a booking for you.";
            if (! $booking->user && $booking->contact && $booking->contact->is_pending) {
                $this->emailMessage = 'A booking has been made for your email with the following details:';
                $this->actionUrl = url("/?invite_token={$booking->contact->invite_token}&auth=signup");
                $this->actionText = 'Create an account';
            }
        }

        $this->actionUrl = config('app.url') . '?auth=login';
        if (count($bookings) > 1) {
            $this->actionText = 'Manage Bookings';
        }

        // $from = Carbon::parse("$booking->date $booking->start");
        // $to = $from->clone()->addMinute($booking->service->duration);

        // $this->link = Link::create($booking->service->name, $from, $to)
        //     ->description($booking->service->description);
        // ->address('Kruikstraat 22, 2018 Antwerpen');
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
