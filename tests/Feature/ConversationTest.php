<?php

namespace App\Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ConversationTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    
    public function testIndex()
    {
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/conversations', $this->headers);
        $response->assertStatus(200);
    }

    public function testShow()
    {
        $conversation = \App\Models\Conversation::where('user_id', $this->user->id)->first();
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/conversations/' . $conversation->id, $this->headers);
        $response->assertStatus(200);


        $conversation = \App\Models\Conversation::find(358);
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/conversations/' . $conversation->id, $this->headers);
        $response->assertStatus(403);

        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/conversations/1116', $this->headers);
        $response->assertStatus(404);
    }


    public function testStore()
    {
        $members = \App\Models\Contact::where('user_id', $this->user->id)->get()->take(2)->pluck('id')->toArray();
        $response = $this->actingAs($this->user)->post($this->app_url . '/ajax/conversations/', ['members' => $members], $this->headers);
        $response->assertStatus(200);


        $members = \App\Models\Contact::where('user_id', '<>', $this->user->id)->get()->take(2)->pluck('id')->toArray();
        $response = $this->actingAs($this->user)->post($this->app_url . '/ajax/conversations/', ['members' => $members], $this->headers);
        $response->assertStatus(403);
    }



    public function testUpdate()
    {
        $conversation = \App\Models\Conversation::where('user_id', $this->user->id)->first();
        $response = $this->actingAs($this->user)->put($this->app_url . '/ajax/conversations/' . $conversation->id, $conversation->toArray(), $this->headers);
        $response->assertStatus(200);


        $conversation = \App\Models\Conversation::find(358);
        $response = $this->actingAs($this->user)->put($this->app_url . '/ajax/conversations/' . $conversation->id, $conversation->toArray(), $this->headers);
        $response->assertStatus(403);

        $response = $this->actingAs($this->user)->put($this->app_url . '/ajax/conversations/1116', $conversation->toArray(), $this->headers);
        $response->assertStatus(404);
    }




    public function testFiles()
    {
        $conversation = \App\Models\Conversation::where('user_id', $this->user->id)->first();
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/conversations/' . $conversation->id . '/files', $this->headers);
        $response->assertStatus(200);


        $conversation = \App\Models\Conversation::find(358);
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/conversations/' . $conversation->id . '/files', $conversation->toArray(), $this->headers);
        $response->assertStatus(403);
    }
}
