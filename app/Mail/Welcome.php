<?php

namespace App\Mail;

use App\Mail\Mailer;
use App\Models\User;

class Welcome extends Mailer
{
    public $user;
    public $actionText = 'Login';
    public $actionUrl;
    public $emailMessage;

    public function __construct(User $user)
    {
        $this->user = $user;
        $this->actionUrl = url("/?auth=login&email=" . $user->email);
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(config('app.noreply_email'), config('app.name'))
            ->subject('Welcome to telloe')
            ->to($this->user->email)
            ->replyTo('roo@telloe.com', 'Roo Wright')
            ->view('emails.welcome');
    }
}
