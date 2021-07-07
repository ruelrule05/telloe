<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Carbon\Carbon;

class BookingLinksTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/booking-links', $this->headers);
        $response->assertStatus(200);
    }

    public function testGetAllTimeslots() 
    {
        $currentDate = Carbon::now()->addDay(1);
        $response = $this->actingAs($this->user)->get($this->app_url . "/ajax/booking-links/get_all_timeslots?date=$currentDate", $this->headers);
        $response->assertStatus(200);
    }

    public function testBookingLinksSendInvitation() 
    {
        $this->bookingLink = \App\Models\BookingLink::first();
        $bookingLink_id = $this->bookingLink->id;
        $response = $this->actingAs($this->user)->post($this->app_url . "/ajax/booking-links/$bookingLink_id/send_invitation", $this->headers);
        $response->assertStatus(200);
    }

    public function testBook() 
    {
        $this->bookingLink = \App\Models\BookingLink::first();
        $uuid = $this->bookingLink->uuid;
        $response = $this->actingAs($this->user)->post($this->app_url . "/ajax/booking-links/$uuid/book", $this->headers);
        $response->assertStatus(200);
    }

    public function testMessage() 
    {
        $this->bookingLink = \App\Models\BookingLink::first();
        $id = $this->bookingLink->id;
        $response = $this->actingAs($this->user)->post($this->app_url . "/ajax/booking-links/$id/message", $this->headers);
        $response->assertStatus(200);
    }

}
