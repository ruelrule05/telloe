<?php

namespace App\Mail;

use App\Mail\Mailer;
use App\Models\User;

class NewUser extends Mailer
{
    public $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(config('app.noreply_email'), config('app.name'))
            ->subject('New User')
            ->view('emails.new-user');
    }
}
