<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

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
            'first_name' => $this->faker->randomElements(['male', 'female']),
            'last_name' => $this->faker->randomElements(['male', 'female']),
            'invite_message' => 'Sample invite message',
        ];
        $response = $this->actingAs($this->user)->post($this->app_url . '/ajax/members', $data, $this->headers);
        $response->assertStatus(200);
    }

    public function testUpdate()
    {
        $data = [
            'email' => $this->faker->unique()->safeEmail,
            'first_name' => $this->faker->randomElements(['male', 'female']),
            'last_name' => $this->faker->randomElements(['male', 'female']),
            'invite_message' => 'Edited sample invite message',
        ];
        $response = $this->actingAs($this->user)->put($this->app_url . '/ajax/members', $data, $this->headers);
        $response->assertStatus(200);
    }

    public function testResend() 
    {
        $id = 1;
        $response = $this->actingAs($this->user)->post($this->app_url . "/ajax/members/$id/resend", $this->headers);
        $response->assertStatus(200);
    }

    public function testAssignService()
    {
        $id = 1;
        $data = [
            'service_id' => 2
        ];
        $response = $this->actingAs($this->user)->post($this->app_url . "/ajax/members/$id/assign_service", $data, $this->headers);
        $response->assertStatus(200);
    }
}
