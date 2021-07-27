<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Auth;

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

    public function testStore() 
    {
        $this->withoutAuthorization();
        $this->booking = \App\Models\Booking::first();
        $service_id = $this->booking->service_id;
        $data = [
            'name' => 'Booking 1',
            'service_id' => $service_id,
            'contact_ids' => [],
            'emails' => [],
            'date' => '2021-08-10',
            'start' => Carbon::now()->addDay(1)->format('H:i'),
            'end' => Carbon::now()->addDay(1)->format('H:i'),
            'notes' => 'Test notes',
            'contact_package_id' => '',
            'meeting_type' => 'Phone',
            'timezone' => "Australia/Brisbane"
        ];
        Mail::fake();
        Mail::assertNothingQueued();
        $response = $this->actingAs($this->user)->post($this->app_url . "/ajax/bookings", $data, $this->headers);
        $response->assertStatus(200);
    }

    public function testUpdate() 
    {
        $this->booking = \App\Models\Booking::latest('id')->first();
        $id = $this->booking->id;
        $data = [
            'date' => '2021-08-10',
            'start' => Carbon::now()->addDay(1)->format('H:i'),
            'end' => Carbon::now()->addDay(1)->format('H:i'),
            'notes' => 'Edited test notes',
            'timezone' => "Australia/Brisbane",
        ];
        $this->withoutMiddleware();
        $response = $this->actingAs($this->user)->put($this->app_url . "/ajax/bookings/" . $id, $data, $this->headers);
        $response->assertStatus(200);
    }

    public function testDelete() 
    {
        $this->withoutMiddleware();
        $this->booking = \App\Models\Booking::latest('id')->first();
        $id = $this->booking->id;
        $response = $this->actingAs($this->user)->delete($this->app_url . '/ajax/bookings/' . $id, $this->headers);
        $response->assertStatus(200);
    }

    public function testDeleteWithAuth() 
    {
        $this->booking = \App\Models\Booking::latest('id')->first();
        $id = $this->booking->id;
        $response = $this->actingAs($this->user)->json("DELETE", $this->app_url . '/ajax/bookings/' . $id, $this->headers);
        $response->assertStatus(403);
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

}
