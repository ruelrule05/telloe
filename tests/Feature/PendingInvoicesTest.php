<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PendingInvoicesTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/pending_invoices', $this->headers);
        $response->assertStatus(200);
    }

    public function testStore()
    {
        $data = [
            'contact_id' => 2,
            'service_ids' => json_decode('[1]', true),
            'amount' => 10,
            'user_id' => 1,
        ];
        $response = $this->actingAs($this->user)->post($this->app_url . "/ajax/pending_invoices", $data, $this->headers);
        $response->assertStatus(200);
    }
}
