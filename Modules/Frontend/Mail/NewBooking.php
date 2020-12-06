<?php

namespace Modules\Frontend\Mail;

use App\Models\User;
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

    public function __construct(array $bookings, User $authUser = null, $target)
    {
        $this->bookings = $bookings;
        $booking = $this->bookings[0];
        $authUser = $authUser ?? Auth::user();
        if ($target == 'client') { // if contact - send to client
            $full_name = $booking->user ? $booking->user->full_name : $booking->contact->full_name;
            $this->email = $booking->service->coach->email;
            $this->emailMessage = "<strong>{$full_name}</strong> has made a booking with the following details:";
        } elseif ($target == 'contact') { // if client - send to contact
            $this->email = $booking->customer->email;
            $this->emailMessage = 'A booking has been made for your account with the following details:';
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
