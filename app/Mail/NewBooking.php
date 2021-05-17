<?php

namespace App\Mail;

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
    public $names;

    public function __construct(array $bookings, $target)
    {
        $this->bookings = $bookings;
        $booking = $this->bookings[0];
        $authUser = $authUser ?? Auth::user();
        $this->names = $booking->bookingUsers->map(function ($bookingUser) {
            return $bookingUser->user ? $bookingUser->user->full_name : $bookingUser->guest['email'];
        })->toArray();
        if ($target == 'serviceUser') {
            $this->email = $booking->service->coach->email;
            $this->emailMessage = 'A booking has been made with the following details:';
        } elseif ($target == 'customer') {
            $this->email = $booking->bookingUsers[0]->user->email ?? $booking['email'];
            $this->emailMessage = "You successfully booked an event <strong>\"{$booking->service->name}\"</strong> with <strong>{$booking->service->coach->full_name}</strong>.";
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
            ->view('emails.new-booking');
    }
}
