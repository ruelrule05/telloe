<?php

namespace App\Mail;

use App\Models\Message;

class NewMessage extends Mailer
{
    public $convoMessage;
    public $actionText = 'View Conversation';
    public $actionUrl;

    public function __construct(Message $convoMessage)
    {
        $this->convoMessage = $convoMessage;
        $this->actionUrl = config('app.url') . '/dashboard/bookings/services/' . $convoMessage->conversation_id;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(config('app.noreply_email'), config('app.name'))
            ->subject('New Message')
            ->view('emails.new-message');
    }
}
