<?php

namespace App\Mail;

use App\Models\ConversationNotifyee;
use App\Models\Message;

class ConversationNotifyeeMail extends Mailer
{
    public $conversationNotifyee;

    public $actionText = 'View Conversation';

    public $body = 'A conversation you subscribed to has a new message';

    public $actionUrl;

    public function __construct(ConversationNotifyee $conversationNotifyee)
    {
        $this->conversationNotifyee = $conversationNotifyee;
        if ($conversationNotifyee->conversation->videoMessage) {
            $this->actionUrl = config('app.url') . '/v/' . $conversationNotifyee->conversation->videoMessage->short_id;
            $this->actionText = 'View Video Message';
            $this->body = 'A video message you subscribed to has a new message';
        } else {
            $this->actionUrl = config('app.url') . '/conversations/' . $conversationNotifyee->conversation->slug;
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
            ->subject('New Message')
            ->view('emails.conversation-notifyee');
    }
}
