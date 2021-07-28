<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PendingSubscriptionsTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/pending_subscriptions', $this->headers);
        $response->assertStatus(200);
    }

    public function testStore()
    {
        $this->withoutMiddleware();
        $data = [
            'contact_id' => 'Test notes',
            'services' => json_decode('[]', true),
            'date' => '2021-08-10',
            'recurring_frequency' => 'week',
            'duration' => 30,
            'duration_frequency' => 'month',
        ];
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/pending_subscriptions', $data, $this->headers);
        $response->assertStatus(200);
    }
}
