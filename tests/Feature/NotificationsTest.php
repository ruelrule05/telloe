<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class NotificationsTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/notifications', $this->headers);
        $response->assertStatus(200);
    }

    public function testGet() 
    {
        $this->notification = \App\Models\Notification::first();
        $id = $this->notification->id;
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/notifications/' . $id, $this->headers);
        $response->assertStatus(200);
    }

    public function testUpdate()
    {
        $this->withoutMiddleware();
        $this->notification = \App\Models\Notification::first();
        $id = $this->notification->id;
        $response = $this->actingAs($this->user)->put($this->app_url . '/ajax/notifications/' . $id, $this->headers);
        $response->assertStatus(200);
    }

}
