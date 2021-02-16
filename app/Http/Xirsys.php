<?php

namespace App\Http;

use Illuminate\Support\Facades\Http;

class Xirsys
{
    protected $channel;
    protected $ident;
    protected $secret;

    public function __construct()
    {
        $this->channel = config('xirsys.channel');
        $this->ident = config('xirsys.ident');
        $this->secret = config('xirsys.secret');
    }

    public function getIceServers()
    {
        $response = Http::withBasicAuth($this->ident, $this->secret)->put("https://global.xirsys.net/_turn/{$this->channel}");
        return $response->json();
    }

    public function getToken($id)
    {
        $data = ['k' => $id, 'expire' => 60];
        $qs = http_build_query($data);
        $response = Http::withBasicAuth($this->ident, $this->secret)->put("https://global.xirsys.net/_token/{$this->channel}?$qs");
        return $response->json();
    }

    public function getHost($id)
    {
        $data = ['k' => $id, 'type' => 'signal'];
        $qs = http_build_query($data);
        $response = Http::withBasicAuth($this->ident, $this->secret)->get("https://global.xirsys.net/_host?$qs");
        return $response->json();
    }
}
