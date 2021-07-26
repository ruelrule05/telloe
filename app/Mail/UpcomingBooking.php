<?php

namespace App\Mail;

use App\Models\Booking;
use Carbon\Carbon;
use Spatie\CalendarLinks\Link;

class UpcomingBooking extends Mailer
{
    public $booking;
    public $actionText = 'View Calendar';
    public $actionUrl;
    public $emailMessage;
    public $names;
    public $duration;
    public $date;
    public $start;
    public $end;

    public function __construct(Booking $booking, $full_name = '', $actionUrl = null)
    {
        $from = Carbon::parse("$booking->date $booking->start");
        $to = $from->clone()->addMinute($booking->service->duration);
        $link = Link::create($booking->service->name, $from, $to)
            ->description($booking->service->description);

        $booking->google_link = $link->google();
        $booking->outlook_link = url('/ics?name=' . $booking->service->name . '&data=' . $link->ics());
        $booking->yahoo_link = $link->yahoo();
        $booking->ical_link = $booking->outlook_link;

        $this->booking = $booking;
        $this->booking->url = config('app.url') . '/bookings/' . $booking->uuid;
        $this->duration = Carbon::parse("$booking->date $booking->start")->diffInMinutes(Carbon::parse("$booking->date $booking->end"));
        $this->date = Carbon::parse($booking->date)->format('M d, Y');
        $this->start = Carbon::parse("$booking->date $booking->start")->format('h:iA');
        $this->end = Carbon::parse("$booking->date $booking->end")->format('h:iA');

        // $this->names = $booking->bookingUsers->map(function ($bookingUser) {
        //     echo isset($bookingUser->guest['email']);
        //     return $bookingUser->user->full_name ?? (isset($bookingUser->guest['email']) ? $bookingUser->guest['email'] : null);
        // })->toArray();
        // $this->names = array_filter($this->names);
        $this->emailMessage = 'You have an upcoming booking with the following details:';
        $this->actionUrl = $actionUrl;
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
