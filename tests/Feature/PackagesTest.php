<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PackagesTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/packages', $this->headers);
        $response->assertStatus(200);
    }

    public function testStore() 
    {
        $data = [
            'name' => 'Package name',
            'description' => 'Sample description',
            'services' => [],
            'expiration_date' => '2021-08-10',
            'price' => 30
        ];
        $response = $this->actingAs($this->user)->post($this->app_url . "/ajax/packages", $data, $this->headers);
        $response->assertStatus(200);
    }

    public function testUpdate() 
    {
        $this->package = \App\Models\Package::latest('id')->first();
        $id = $this->package->id;
        $data = [
            'name' => 'Package name',
            'description' => 'Sample description',
            'services' => [],
            'expiration_date' => '2021-08-10',
            'price' => 30,
            'in_widget' => true,
            'is_available' => true,
        ];
        $response = $this->actingAs($this->user)->put($this->app_url . "/ajax/packages" . $id, $data, $this->headers);
        $response->assertStatus(200);
    }

    public function testDestroy()
    {
        $this->package = \App\Models\Package::latest('id')->first();
        $id = $this->package->id;
        $response = $this->actingAs($this->user)->delete($this->app_url . "/ajax/packages" . $id, $this->headers);
        $response->assertStatus(200);
    }
}
