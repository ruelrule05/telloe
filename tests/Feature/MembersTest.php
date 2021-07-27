<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\Mail;
use Mockery;
use Mockery\MockInterface;

class MembersTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/members', $this->headers);
        $response->assertStatus(200);
    }

    public function testStore()
    {
        $data = [
            'email' => $this->faker->unique()->safeEmail,
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'invite_message' => 'Sample invite message',
            'assigned_services' => []
        ];
        $response = $this->actingAs($this->user)->post($this->app_url . '/ajax/members', $data, $this->headers);
        $response->assertStatus(200);
    }

    public function testResend() 
    {
        $id = 1;
        $this->withoutMiddleware();
        Mail::fake();
        Mail::assertNothingQueued();
        $response = $this->actingAs($this->user)->post($this->app_url . "/ajax/members/$id/resend", $this->headers);
        $response->assertStatus(200);

        $id = 5555;
        $response = $this->actingAs($this->user)->post($this->app_url . "/ajax/members/$id/resend", $this->headers);
        $response->assertStatus(404);
    }
}
