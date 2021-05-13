<?php

namespace App\Mail;

use App\Mail\Mailer;
use App\Models\Member;

class SendMemberInvitation extends Mailer
{
    public $userCustomer;
    public $actionText = 'Accept Invitation';
    public $actionUrl;
    public $emailMessage;

    public function __construct(Member $member, $authTab, $message = null)
    {
        $appName = config('app.name');
        $this->member = $member;
        $this->actionUrl = url("/?member_invite_token=$member->invite_token&auth=$authTab");
        $this->emailMessage = strlen($message) > 0 ? $message : "<strong>{$member->user->full_name}</strong> has invited you as a member in {$appName}.";
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(config('app.noreply_email'), config('app.name'))
            ->subject('Member Invitation')
            ->view('emails.send-member-invitation');
    }
}
