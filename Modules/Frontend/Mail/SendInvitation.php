<?php

namespace Modules\Frontend\Mail;

use Modules\Frontend\Mail\Mailer;
use App\Models\Contact;

class SendInvitation extends Mailer
{
    public $userCustomer;
    public $actionText = 'Accept Invitation';
    public $actionUrl;
    public $emailMessage;

    public function __construct(Contact $contact, $authTab, $message = null)
    {
        $appName = config('app.name');
        $this->contact = $contact;
        $this->actionUrl = url("/?invite_token=$contact->invite_token&auth=$authTab");
        $this->emailMessage = strlen($message) > 0 ? $message : "<strong>{$contact->user->full_name}</strong> has invited you in {$appName}.";
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
