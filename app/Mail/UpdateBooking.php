<?php

namespace App\Mail;

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
    public $url;
    public $startFormat;
    public $endFormat;
    public $formattedDate;
    public $duration;
    public $timezone;
    public $meta_timezone;
    public $meta_startFormat;
    public $meta_endFormat;

    public function __construct($booking, $target, $attendeeEmail = null)
    {
        $this->booking = $booking;

        $this->url = config('app.url') . '/bookings/' . $booking->uuid;
        $this->timezone = $booking->timezone;
        $this->startFormat = Carbon::parse("$booking->date $booking->start")->format('h:iA');
        $this->endFormat = Carbon::parse("$booking->date $booking->end")->format('h:iA');
        $this->formattedDate = Carbon::parse($booking->date)->format('M d, Y');
        $this->duration = Carbon::parse("$booking->date $booking->start")->diffInMinutes(Carbon::parse("$booking->date $booking->end"));

        $customTimezone = null;

        $this->emailMessage = 'A booking has been modified with the following details:';
        if ($target == 'serviceUser') {
            $this->timezone = $booking->timezone;
            $this->startFormat = Carbon::parse("$booking->date $booking->start", $booking->timezone)->setTimezone($this->timezone)->format('h:iA');
            $this->endFormat = Carbon::parse("$booking->date $booking->end", $booking->timezone)->setTimezone($this->timezone)->format('h:iA');

            $customTimezone = $booking->service->coach->timezone;
            if ($this->timezone != $customTimezone) {
                $this->meta_timezone = $customTimezone;
                $this->meta_startFormat = Carbon::parse("$booking->date $booking->start", $customTimezone)->setTimezone($this->timezone)->format('h:iA');
                $this->meta_endFormat = Carbon::parse("$booking->date $booking->end", $customTimezone)->setTimezone($this->timezone)->format('h:iA');
            }

            if ($booking->service->coach->notify_email) {
                $this->email = $booking->service->coach->email;
            }
        } elseif ($target == 'contact' && $attendeeEmail) { // if client - send to contact
            $this->email = $attendeeEmail;
        }

        $this->actionUrl = config('app.url') . '?auth=login';

        $from = Carbon::parse("$booking->date $booking->start", $booking->timezone);
        $to = Carbon::parse("$booking->date $booking->end", $booking->timezone);

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
