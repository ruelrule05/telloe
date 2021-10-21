<?php

namespace App\Mail;

use Auth;
use Carbon\Carbon;
use Spatie\CalendarLinks\Link;

class NewBooking extends Mailer
{
    public $actionText = 'View Booking';
    public $actionUrl;
    public $email;
    public $emailMessage;
    public $names;
    public $bookings;
    public $duration;

    public function __construct(array $bookings, $target, $bookingUserEmail = null, $userTriggered = false)
    {
        $this->actionText = 'Manage Bookings';
        $this->actionUrl = config('app.url') . '/bookings/' . $bookings[0]->uuid;

        if ($target == 'serviceUser') {
            $this->email = $bookings[0]->service->coach->email;
            $this->emailMessage = 'A booking has been made with the following details:';
        } elseif ($target == 'customer') {
            $this->email = $bookingUserEmail;
            if ($userTriggered) {
                $this->emailMessage = "You successfully booked an event <strong>\"{$bookings[0]->service->name}\"</strong> with <strong>{$bookings[0]->service->coach->full_name}</strong>.";
            } else {
                $this->emailMessage = 'A booking has been made for your email with the following details:';
                // $this->actionUrl = url("/?invite_token={$bookings[0]->contact->invite_token}&auth=signup");
                // $this->actionText = 'Create an account';
            }
        }

        $this->bookings = collect($bookings);
        $this->bookings->map(function ($booking) {
            $booking->url = config('app.url') . '/bookings/' . $booking->uuid;
            $from = Carbon::parse("$booking->date $booking->start");
            $to = $from->clone()->addMinute($booking->service->duration);
            $link = Link::create($booking->service->name, $from, $to)
                ->description($booking->service->description);

            $booking->google_link = $link->google();
            $booking->outlook_link = url('/ics?name=' . $booking->service->name . '&data=' . $link->ics());
            $booking->yahoo_link = $link->yahoo();
            $booking->ical_link = $booking->outlook_link;
            $booking->formattedDate = Carbon::parse($booking->date)->format('M d, Y');
            $booking->duration = Carbon::parse("$booking->date $booking->start")->diffInMinutes(Carbon::parse("$booking->date $booking->end"));

            $booking->startFormat = Carbon::parse("$booking->date $booking->start")->format('h:iA');
            $booking->endFormat = Carbon::parse("$booking->date $booking->end")->format('h:iA');

            return $booking;
        });
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
