<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class OrganizationsTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/organizations', $this->headers);
        $response->assertStatus(200);
    }

    public function testStore() 
    {
        $data = [
            'slug' => $this->faker->slug,
            'name' => $this->faker->company,
            'members' => [],
        ];
        $response = $this->actingAs($this->user)->post($this->app_url . "/ajax/organizations", $data, $this->headers);
        $response->assertStatus(200);
    }

    public function testAddMember()
    {
        $id = 1;
        $data = [
            'member_ids' => json_decode('[1, 2]')
        ];
        $response = $this->actingAs($this->user)->post($this->app_url . "/ajax/organizations/$id/add_members", $data, $this->headers);
        $response->assertStatus(200);
    }

    public function testDeleteMember() 
    {
        $this->withoutMiddleware();
        $id = 2;
        $response = $this->actingAs($this->user)->delete($this->app_url . "/ajax/organizations/$id/delete_member", $this->headers);
        $response->assertStatus(302);
    }
    
}
