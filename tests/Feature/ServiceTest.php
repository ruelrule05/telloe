<?php

namespace App\Tests\Feature;

use Tests\TestCase;

class ServiceTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    // public function testIndex()
    // {
    //     $this->withoutExceptionHandling();
    //     $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/services', $this->headers);
    //     $response->assertStatus(200);
    // }

    // public function testStore()
    // {
    //     $data = [
    //         'name' => 'Service 1',
    //         'description' => 'Service description',
    //         'duration' => 36,
    //         'days' => json_decode('{
    //             "Friday": {
    //                 "end": "17:00",
    //                 "start": "08:00",
    //                 "isOpen": true
    //             },
    //             "Monday": {
    //                 "end": "17:00",
    //                 "start": "08:00",
    //                 "isOpen": true
    //             },
    //             "Sunday": {
    //                 "end": "17:00",
    //                 "start": "08:00",
    //                 "isOpen": false
    //             },
    //             "Tuesday": {
    //                 "end": "17:00",
    //                 "start": "08:00",
    //                 "isOpen": true
    //             },
    //             "Saturday": {
    //                 "end": "17:00",
    //                 "start": "08:00",
    //                 "isOpen": false
    //             },
    //             "Thursday": {
    //                 "end": "17:00",
    //                 "start": "08:00",
    //                 "isOpen": true
    //             },
    //             "Wednesday": {
    //                 "end": "17:00",
    //                 "start": "08:00",
    //                 "isOpen": true
    //             }
    //         }'),
    //         'timezone' => 'Australia/Brisbane',
    //         'default_rate' => 50.78
    //     ];
    //     $this->withoutMiddleware();
    //     $user = \App\Models\User::where('is_premium', true)->first();
    //     $response = $this->actingAs($user)->post($this->app_url . '/ajax/services', $data, $this->headers);
    //     $response->assertStatus(200);

    //     $user = \App\Models\User::where('is_premium', false)->first();
    //     $response = $this->actingAs($user)->post($this->app_url . '/ajax/services', $data, $this->headers);
    //     $response->assertStatus(403);
    // }

    // public function testUpdate()
    // {
    //     $this->withoutAuthorization();
    //     $data = [
    //         'name' => 'Service 1',
    //         'description' => 'Edited Service description',
    //         'duration' => 36,
    //         'days' => json_decode('{
    //             "Friday": {
    //                 "end": "17:00",
    //                 "start": "08:00",
    //                 "isOpen": true
    //             },
    //             "Monday": {
    //                 "end": "17:00",
    //                 "start": "08:00",
    //                 "isOpen": true
    //             },
    //             "Sunday": {
    //                 "end": "17:00",
    //                 "start": "08:00",
    //                 "isOpen": false
    //             },
    //             "Tuesday": {
    //                 "end": "17:00",
    //                 "start": "08:00",
    //                 "isOpen": true
    //             },
    //             "Saturday": {
    //                 "end": "17:00",
    //                 "start": "08:00",
    //                 "isOpen": false
    //             },
    //             "Thursday": {
    //                 "end": "17:00",
    //                 "start": "08:00",
    //                 "isOpen": true
    //             },
    //             "Wednesday": {
    //                 "end": "17:00",
    //                 "start": "08:00",
    //                 "isOpen": true
    //             }
    //         }'),
    //         'default_rate' => 50.78
    //     ];
    //     $this->service = \App\Models\Service::latest('id')->first();
    //     $service_id = $this->service->id;
    //     $response = $this->actingAs($this->user)->put($this->app_url . "/ajax/services/$service_id", $data, $this->headers);
    //     $response->assertStatus(200);
    // }

    // public function testUpdateWithAuth()
    // {
    //     $data = [
    //         'name' => 'Service 1',
    //         'description' => 'Edited Service description',
    //         'duration' => 36,
    //         'days' => json_decode('{
    //             "Friday": {
    //                 "end": "17:00",
    //                 "start": "08:00",
    //                 "isOpen": true
    //             },
    //             "Monday": {
    //                 "end": "17:00",
    //                 "start": "08:00",
    //                 "isOpen": true
    //             },
    //             "Sunday": {
    //                 "end": "17:00",
    //                 "start": "08:00",
    //                 "isOpen": false
    //             },
    //             "Tuesday": {
    //                 "end": "17:00",
    //                 "start": "08:00",
    //                 "isOpen": true
    //             },
    //             "Saturday": {
    //                 "end": "17:00",
    //                 "start": "08:00",
    //                 "isOpen": false
    //             },
    //             "Thursday": {
    //                 "end": "17:00",
    //                 "start": "08:00",
    //                 "isOpen": true
    //             },
    //             "Wednesday": {
    //                 "end": "17:00",
    //                 "start": "08:00",
    //                 "isOpen": true
    //             }
    //         }'),
    //         'default_rate' => 50.78,
    //         'in_widget' => true
    //     ];
    //     $service_id = 76;
    //     $response = $this->actingAs($this->user)->put($this->app_url . "/ajax/services/$service_id", $data, $this->headers);
    //     $response->assertStatus(403);
    // }

    // public function testDestroy()
    // {
    //     $this->withoutMiddleware();
    //     $this->service = \App\Models\Service::latest('id')->first();
    //     $service_id = $this->service->id;
    //     $response = $this->actingAs($this->user)->delete($this->app_url . "/ajax/services/$service_id", $this->headers);
    //     $response->assertStatus(403);
    // }

    // public function testDestroyWithAuth()
    // {
    //     $this->service = \App\Models\Service::latest('id')->first();
    //     $service_id = $this->service->id;
    //     $response = $this->actingAs($this->user)->delete($this->app_url . "/ajax/services/$service_id", $this->headers);
    //     $response->assertStatus(403);
    // }
}
