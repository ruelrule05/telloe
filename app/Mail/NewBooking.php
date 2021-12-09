<?php

namespace App\Mail;

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
        $customTimezone = null;

        if ($target == 'serviceUser') {
            $this->email = $bookings[0]->service->coach->email;
            $this->emailMessage = 'A booking has been made with the following details:';
            $customTimezone = $bookings[0]->service->coach->timezone;
        } elseif ($target == 'customer') {
            $this->email = $bookingUserEmail;
            if ($userTriggered) {
                $this->emailMessage = "You successfully booked an event <strong>\"{$bookings[0]->name}\"</strong> with <strong>{$bookings[0]->service->coach->full_name}</strong>.";
            } else {
                $this->emailMessage = 'A booking has been made for your email with the following details:';
                // $this->actionUrl = url("/?invite_token={$bookings[0]->contact->invite_token}&auth=signup");
                // $this->actionText = 'Create an account';
            }
        }

        $this->bookings = collect($bookings);
        $this->bookings->map(function ($booking) use ($customTimezone) {
            $booking->url = config('app.url') . '/bookings/' . $booking->uuid;
            $from = Carbon::parse("$booking->date $booking->start", $booking->timezone);
            $to =  Carbon::parse("$booking->date $booking->end", $booking->timezone);
            $description = $booking->service->description;
            if ($booking->zoom_link) {
                $description .= "\n\nZoom link: " . $booking->zoom_link;
            }

            $link = Link::create($booking->customName ?? $booking->name, $from, $to)
                ->description($description);

            $booking->google_link = $link->google();
            $booking->outlook_link = url('/ics?name=' . $booking->name . '&data=' . $link->ics());
            $booking->yahoo_link = $link->yahoo();
            $booking->ical_link = $booking->outlook_link;
            $booking->formattedDate = Carbon::parse($booking->date)->format('M d, Y');
            $booking->duration = Carbon::parse("$booking->date $booking->start")->diffInMinutes(Carbon::parse("$booking->date $booking->end"));

            $booking->startFormat = Carbon::parse("$booking->date $booking->start")->format('h:iA');
            $booking->endFormat = Carbon::parse("$booking->date $booking->end")->format('h:iA');

            if ($customTimezone && $customTimezone != $booking->timezone) {
                $start = Carbon::parse("$booking->date $booking->start", $booking->timezone)->setTimezone($customTimezone)->format('h:iA');
                $end = Carbon::parse("$booking->date $booking->end", $booking->timezone)->setTimezone($customTimezone)->format('h:iA');
                $booking->meta_timezone = $customTimezone;
                $booking->meta_startFormat = $start;
                $booking->meta_endFormat = $end;
            }

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
