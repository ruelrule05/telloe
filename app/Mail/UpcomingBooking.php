<?php

namespace App\Mail;

use App\Models\Booking;
use Carbon\Carbon;
use Spatie\CalendarLinks\Link;

class UpcomingBooking extends Mailer
{
    public $booking;
    public $actionText = 'View Calendar';
    public $emailMessage;
    public $names;
    public $duration;
    public $date;
    public $start;
    public $end;
    public $timezone;
    public $meta_timezone;
    public $meta_start;
    public $meta_end;

    public function __construct(Booking $booking, $timezone)
    {
        $description = $booking->service->description;
        if ($booking->zoom_link) {
            $description .= "\n\nZoom link: " . $booking->zoom_link;
        }
        $from = Carbon::parse("$booking->date $booking->start", $booking->timezone);
        $to = Carbon::parse("$booking->date $booking->end", $booking->timezone);
        $link = Link::create($booking->name, $from, $to)
            ->description($description);
        $this->timezone = $booking->timezone;

        $booking->google_link = $link->google();
        $booking->outlook_link = url('/ics?name=' . $booking->name . '&data=' . $link->ics());
        $booking->yahoo_link = $link->yahoo();
        $booking->ical_link = $booking->outlook_link;

        $this->booking = $booking;
        $this->booking->url = config('app.url') . '/bookings/' . $booking->uuid;
        $this->duration = Carbon::parse("$booking->date $booking->start")->diffInMinutes(Carbon::parse("$booking->date $booking->end"));
        $this->date = Carbon::parse($booking->date, $booking->timezone)->format('M d, Y');
        $this->start = Carbon::parse("$booking->date $booking->start", $booking->timezone)->format('h:iA');
        $this->end = Carbon::parse("$booking->date $booking->end", $booking->timezone)->format('h:iA');

        if ($booking->timezone != $timezone) {
            $this->meta_timezone = $timezone;
            $this->meta_start = Carbon::parse("$booking->date $booking->start", $booking->timezone)->setTimezone($timezone)->format('h:iA');
            $this->meta_end = Carbon::parse("$booking->date $booking->end", $booking->timezone)->setTimezone($timezone)->format('h:iA');
        }

        // $this->names = $booking->bookingUsers->map(function ($bookingUser) {
        //     echo isset($bookingUser->guest['email']);
        //     return $bookingUser->user->full_name ?? (isset($bookingUser->guest['email']) ? $bookingUser->guest['email'] : null);
        // })->toArray();
        // $this->names = array_filter($this->names);
        $this->emailMessage = 'You have an upcoming booking with the following details:';
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(config('app.noreply_email'), config('app.name'))
            ->subject('Upcoming Booking')
            ->view('emails.upcoming-booking');
    }
}
