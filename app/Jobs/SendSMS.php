<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

use \App\Http\NexmoClient;

class SendSMS implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $to;
    private $message;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($to, $message)
    {
        //
        $this->to = $to;
        $this->message = $message;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //
        $nexmo = new NexmoClient;
        $nexmo->sms($this->to, $this->message);
    }
}
