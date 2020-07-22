<?php

namespace Modules\Frontend\Mail;

use Modules\Frontend\Mail\Mailer;
use App\Models\PasswordReset;

class SendPasswordReset extends Mailer
{
    public $passwordReset;
    public $actionUrl;
    public $actionText = 'Reset Password';

    public function __construct(PasswordReset $passwordReset)
    {
        $this->passwordReset = $passwordReset;
        $this->actionUrl = config('app.url') . '?auth=reset&token=' . $passwordReset->token;
    }

    public function build()
    {
        return $this->from('noreply@telloe.com', config('app.name'))
            ->subject('Password Reset')
            ->view('frontend::emails.send-password-reset');
    }
}