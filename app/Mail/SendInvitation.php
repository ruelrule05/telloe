<?php

namespace App\Mail;

use App\Mail\Mailer;
use App\Models\UserCustomer;

class SendInvitation extends Mailer
{
    public $userCustomer;
    public $actionText = 'Accept Invitation';
    public $actionUrl;

    public function __construct(UserCustomer $userCustomer)
    {
        $this->userCustomer = $userCustomer;
        $this->actionUrl = url("/?invite_token=$userCustomer->invite_token");
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.send-invitation');
    }
}
