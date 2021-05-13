<?php

namespace App\Mail;

use App\Models\Conversation;

class NewConversation extends Mailer
{
    public $conversation;
    public $actionText = 'View Conversation';
    public $actionUrl;
    PUBLIC $signUp;

    public function __construct(Conversation $conversation, bool $signUp = false)
    {
        $this->conversation = $conversation;
        $this->signUp = $signUp;
        if ($this->signUp) {
            $this->actionUrl = config('app.url') . '?auth=signup';
            $this->actionText = 'Sign Up';
        } else {
            $this->actionUrl = config('app.url') . '/dashboard/conversations/' . $conversation->id;
        }
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(config('app.noreply_email'), config('app.name'))
            ->subject('New Conversation')
            ->view('emails.new-conversation');
    }
}
