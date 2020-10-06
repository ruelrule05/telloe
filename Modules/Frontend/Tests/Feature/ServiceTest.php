<?php

namespace Modules\Frontend\Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ServiceTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/services', $this->headers);
        $response->assertStatus(200);
    }

    public function testStore()
    {
        $data = [
    		'name' => 'Service 1',
    		'description' => 'Service description',
    		'duration' =>  36,
            'days' => json_decode('{
                "Friday": {
                    "end": "17:00",
                    "start": "08:00",
                    "isOpen": true
                },
                "Monday": {
                    "end": "17:00",
                    "start": "08:00",
                    "isOpen": true
                },
                "Sunday": {
                    "end": "17:00",
                    "start": "08:00",
                    "isOpen": false
                },
                "Tuesday": {
                    "end": "17:00",
                    "start": "08:00",
                    "isOpen": true
                },
                "Saturday": {
                    "end": "17:00",
                    "start": "08:00",
                    "isOpen": false
                },
                "Thursday": {
                    "end": "17:00",
                    "start": "08:00",
                    "isOpen": true
                },
                "Wednesday": {
                    "end": "17:00",
                    "start": "08:00",
                    "isOpen": true
                }
            }'),
            'default_rate' => 50.78
    	];
        $response = $this->actingAs($this->user)->post($this->app_url . '/ajax/services', $data, $this->headers);
        $response->assertStatus(200);

    }


    public function testUpdate()
    {
        $data = [
    		'name' => 'Service 1',
    		'description' => 'Service description',
    		'duration' =>  36,
            'days' => json_decode('{
                "Friday": {
                    "end": "17:00",
                    "start": "08:00",
                    "isOpen": true
                },
                "Monday": {
                    "end": "17:00",
                    "start": "08:00",
                    "isOpen": true
                },
                "Sunday": {
                    "end": "17:00",
                    "start": "08:00",
                    "isOpen": false
                },
                "Tuesday": {
                    "end": "17:00",
                    "start": "08:00",
                    "isOpen": true
                },
                "Saturday": {
                    "end": "17:00",
                    "start": "08:00",
                    "isOpen": false
                },
                "Thursday": {
                    "end": "17:00",
                    "start": "08:00",
                    "isOpen": true
                },
                "Wednesday": {
                    "end": "17:00",
                    "start": "08:00",
                    "isOpen": true
                }
            }'),
            'default_rate' => 50.78
        ];
        $service_id = $this->user->services()->first()->id;
        $response = $this->actingAs($this->user)->put($this->app_url . "/ajax/services/$service_id", $data, $this->headers);
        $response->assertStatus(200);

        $service_id = 255;
        $response = $this->actingAs($this->user)->put($this->app_url . "/ajax/services/$service_id", $data, $this->headers);
        $response->assertStatus(403);
    }
}
