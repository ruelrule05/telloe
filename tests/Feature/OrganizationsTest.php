<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

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
            'slug' => $this->faker->randomElements(['male', 'female']),
            'name' => 'Sample name',
            'members' => [],
        ];
        $response = $this->actingAs($this->user)->post($this->app_url . "/ajax/organizations", $data, $this->headers);
        $response->assertStatus(200);
    }

    public function testUpdate() 
    {
        $this->org = \App\Models\Organization::latest('id')->first();
        $id = $this->org->id;
        $data = [
            'slug' => $this->faker->randomElements(['male', 'female']),
            'name' => 'Edited sample name',
            'show_user_services' => 2,
        ];
        $response = $this->actingAs($this->user)->put($this->app_url . "/ajax/organizations" . $id, $data, $this->headers);
        $response->assertStatus(200);
    }

    public function testDeleteMember() 
    {
        $id = 1;
        $response = $this->actingAs($this->user)->delete($this->app_url . "/ajax/organizations/$id/delete_member", $this->headers);
        $response->assertStatus(200);
    }

    public function testAddMember()
    {
        $id = 1;
        $data = [1, 2];
        $response = $this->actingAs($this->user)->post($this->app_url . "/ajax/organizations/$id/add_members", $data, $this->headers);
        $response->assertStatus(200);
    }

    public function testDestroy() 
    {
        $this->org = \App\Models\Organization::latest('id')->first();
        $id = $this->org->id;
        $response = $this->actingAs($this->user)->delete($this->app_url . "/ajax/organizations" . $id, $this->headers);
        $response->assertStatus(200);
    }

}
