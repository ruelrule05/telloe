<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserCustomFieldsTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->actingAs($this->user)->get($this->app_url . "/ajax/user_custom_fields", $this->headers);
        $response->assertStatus(200);
    }

    public function testStore()
    {
        $data = [
            'fields' => []
        ];
        $response = $this->actingAs($this->user)->post($this->app_url . "/ajax/user_custom_fields", $data, $this->headers);
        $response->assertStatus(200);
    }
}
