<?php

namespace App\Mail;

use App\Models\BookingLink;

class SendBookingLinkInvitation extends Mailer
{
    public $actionText = 'View Booking Link';
    public $actionUrl;
    public $emailMessage;

    public function __construct(BookingLink $bookingLink, $email = null)
    {
        $this->actionUrl = url("/booking-links/$bookingLink->uuid");
        $this->emailMessage = $bookingLink->message ? $bookingLink->message : "<strong>{$bookingLink->user->full_name}</strong> has sent you a range of times to select that match up with your time zone and when {$bookingLink->user->first_name} is available to meet.";
        if ($email) {
            $this->actionUrl .= "?email={$email}";
        }
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(config('app.noreply_email'), config('app.name'))
            ->subject('Booking Link Invitation')
            ->view('emails.booking-link-invitation');
    }
}
