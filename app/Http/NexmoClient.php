<?php

namespace App\Http;

use \Nexmo\Client\Credentials\Basic;
use \Nexmo\Client;

class NexmoClient {
    protected $key;
    protected $secret;
    protected $brand;
    protected $client;

    public function __construct()
    {
        $this->key = env('NEXMO_API_KEY');
        $this->secret = env('NEXMO_API_SECRET');
        $this->brand = env('NEXMO_BRAND');
        $basic = new Basic($this->key, $this->secret);
        $this->client = new Client($basic);;
    }

    public function sms($to, $message)
    {
        if(!$to || !$message) return;

        $this->client->message()->send([
            'to' => $to, 
            'from' => $this->brand, 
            'text' => $message
        ]);
    }
}