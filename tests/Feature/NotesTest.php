<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class NotesTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testIndex()
    {
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/notes', $this->headers);
        $response->assertStatus(200);
    }

    public function testStore()
    {
        $this->conversation = \App\Models\Conversation::first();
        $conversation_id = $this->conversation->id;
        $data = [
            'conversation_id' => $conversation_id,
            'notes' => 'Test notes'
        ];
        $response = $this->actingAs($this->user)->post($this->app_url . "/ajax/notes", $data, $this->headers);
        $response->assertStatus(200);
    }

    public function testUpdate()
    {
        $this->note = \App\Models\Note::first();
        $id = $this->note->id;
        $data = [
            'notes' => 'Test notes',
            'tags' => json_decode('[]', true),
        ];
        $response = $this->actingAs($this->user)->put($this->app_url . '/ajax/notes/' . $id, $data, $this->headers);
        $response->assertStatus(200);
    }

    public function testDelete()
    {
        $this->note = \App\Models\Note::latest('id')->first();
        $id = $this->note->id;
        $response = $this->actingAs($this->user)->delete($this->app_url . '/ajax/notes/' . $id, $this->headers);
        $response->assertStatus(200);
    }

}
