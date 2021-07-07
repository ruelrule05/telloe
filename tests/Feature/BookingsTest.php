<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BookingsTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/bookings', $this->headers);
        $response->assertStatus(200);
    }

    public function testUpcomingBookings() 
    {
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/bookings/upcoming', $this->headers);
        $response->assertStatus(200);
    }

    public function testContactBookings() 
    {
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/bookings/contact', $this->headers);
        $response->assertStatus(200);
    }

    public function testAssignToMember() 
    {
        $this->booking = \App\Models\Booking::first();
        $id = $this->booking->id;
        $data = [
            'service_id' => $this->booking->service_id
        ];
        $response = $this->actingAs($this->user)->post($this->app_url . "/ajax/bookings/$id/assign_to_member", $data, $this->headers);
        $response->assertStatus(200);
    }

}
