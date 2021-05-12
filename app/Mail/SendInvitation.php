<?php

namespace App\Mail;

use Auth;

class SendInvitation extends Mailer
{
    public $userCustomer;
    public $actionText = 'Accept Invitation';
    public $actionUrl;
    public $emailMessage;

    public function __construct($inviteToken, $authTab, $message = null)
    {
        $authUser = Auth::user();
        $appName = config('app.name');
        $this->actionUrl = url("/?invite_token=$inviteToken&auth=$authTab");
        $this->emailMessage = strlen($message) > 0 ? $message : "<strong>{$authUser->full_name}</strong> has invited you in {$appName}.";
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(config('app.noreply_email'), config('app.name'))
            ->subject('Contact Invitation')
            ->view('emails.send-invitation');
    }
}
