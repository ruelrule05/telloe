<?php

namespace App\Http;

use Illuminate\Support\Facades\Http;

class Data365
{
    private $token; 
    private $url = 'https://api.data365.co/v1.1';
    private $username;

    public function __construct(string $username)
    {
        $this->token = config('data365.token');
        $this->username = $username;
    }

    public function getActivities(string $activityType)
    {
        $data = [
            'order_by' => 'date_desc',
            'access_token' => $this->token,
        ];
        $response = Http::get($this->url . '/linkedin/member/' . $this->username . '/activity/' . $activityType . '/posts', $data);
        if ($response->successful()) {
            $data = $response->json()['data']['items'] ?? [];
        }
        return $data;
    }

    public function createTask()
    {
        $data = [
            'load_activities' => 1,
            'max_activities' => 100,
            'callback_url' => config('app.url') . '/data365/callback/' . $this->username,
            'access_token' => $this->token,
        ];
        Http::post($this->url . '/linkedin/member/' . $this->username . '/update?' . http_build_query($data));
    }
}
