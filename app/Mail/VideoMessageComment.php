<?php

namespace App\Mail;

use App\Models\VideoMessage;

class VideoMessageComment extends Mailer
{
    public $videoMessage;
    public $actionText = 'View Comments';
    public $actionUrl;

    public function __construct(VideoMessage $videoMessage)
    {
        $this->videoMessage = $videoMessage;
        $this->actionUrl = config('app.url') . '/video-messages/' . $videoMessage->uuid;
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
            ->view('emails.video-message-comment');
    }
}
