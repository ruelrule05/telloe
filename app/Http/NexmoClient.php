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
        $this->key = config('nexmo.api_key');
        $this->secret = config('nexmo.api_secret');
        $this->brand = config('nexmo.brand');
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