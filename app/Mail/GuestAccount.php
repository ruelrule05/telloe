<?php

namespace App\Mail;

class GuestAccount extends Mailer
{
    public $password;
    public $actionText = 'Login';
    public $actionUrl;

    public function __construct(String $password)
    {
        $this->password = $password;
        $this->actionUrl = config('app.url') . '/?auth=login';
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(config('app.noreply_email'), config('app.name'))
            ->subject('Account Created')
            ->view('emails.guest-account');
    }
}
