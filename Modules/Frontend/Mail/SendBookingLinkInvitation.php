<?php

namespace Modules\Frontend\Mail;

use App\Models\BookingLink;

class SendBookingLinkInvitation extends Mailer
{
    public $actionText = 'View Booking Link';
    public $actionUrl;
    public $emailMessage;

    public function __construct(BookingLink $bookingLink, $email = null)
    {
        $this->actionUrl = url("/booking-links/$bookingLink->uuid");
        $this->emailMessage = "<strong>{$bookingLink->user->full_name}</strong> has invited you in a booking link.";
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
            ->view('frontend::emails.booking-link-invitation');
    }
}
