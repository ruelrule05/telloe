<?php

namespace Modules\Frontend\Mail;

use Modules\Frontend\Mail\Mailer;
use App\Models\UserCustomer;

class SendInvitation extends Mailer
{
    public $userCustomer;
    public $actionText = 'Accept Invitation';
    public $actionUrl;

    public function __construct(UserCustomer $userCustomer, $authTab)
    {
        $this->userCustomer = $userCustomer;
        $this->actionUrl = url("/?invite_token=$userCustomer->invite_token&auth=$authTab");
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(config('app.noreply_email'), config('app.name'))
            ->subject('Customer Invitation')
            ->view('frontend::emails.send-invitation');
    }
}
