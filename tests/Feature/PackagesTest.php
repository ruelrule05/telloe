<?php

namespace Tests\Feature;

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
        $this->withoutAuthorization();
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/packages', $this->headers);
        $response->assertStatus(200);
        // dd($response);
    }

    // public function testStore() 
    // {
    //     // $this->withoutExceptionHandling();
    //     $data = [
    //         'name' => 'Package name',
    //         'description' => 'Sample description',
    //         'services' => json_decode('[]'),
    //         // 'Sample services',
    //         // json_decode($services, TRUE),
    //         'expiration_date' => '2021-08-10',
    //         'price' => 30,
    //         // 'country' => 'AU',
    //         // 'currency' => 'AUD'
    //     ];
    //     $response = $this->actingAs($this->user)->post($this->app_url . "/ajax/packages", $data, $this->headers);
    //     // $response->assertStatus(200);
    //     dd($response);
    //     dd($data);
    // }

    // public function testDestroy()
    // {
        // $this->withoutMiddleware();
        // $this->package = \App\Models\Package::latest('id')->first();
        // $id = $this->package->id;
        // $response = $this->actingAs($this->user)->delete($this->app_url . "/ajax/packages/" . $id, $this->headers);
        // $response->assertStatus(200);
        // dd($this->package);
        // dd($id);
    // }
}
