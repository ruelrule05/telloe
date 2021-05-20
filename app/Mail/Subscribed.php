<?php

namespace App\Mail;

use App\Models\Plan;

class Subscribed extends Mailer
{
    public $conversation;
    public $actionText;
    public $actionUrl;
    PUBLIC $plan;

    public function __construct(Plan $plan)
    {
        $this->plan = $plan;
        $this->actionUrl = config('app.url') . '/dashboard/account';
        $this->actionText = 'Manage Subscription';
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(config('app.noreply_email'), config('app.name'))
            ->subject('You have subscribed to ' . $this->plan->name . ' plan')
            ->view('emails.subscribed');
    }
}
