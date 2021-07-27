<?php

namespace App\Tests\Feature;

use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

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
        $this->withoutMiddleware();
        $conversation = \App\Models\Conversation::where('user_id', $this->user->id)->first();
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/conversations/' . $conversation->id, $this->headers);
        $response->assertStatus(200);

        $conversation_id = \App\Models\Conversation::where('user_id', '<>', $this->user->id)->first()->id;
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/conversations/' . $conversation_id, $this->headers);
        $response->assertStatus(403);

        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/conversations/1116', $this->headers);
        $response->assertStatus(404);
    }

    public function testStore()
    {
        $members = \App\Models\Contact::has('contactUser')->where('user_id', $this->user->id)->where('is_pending', false)->get()->take(2)->pluck('contact_user_id')->toArray();
        Mail::fake();
        Mail::assertNothingQueued();
        $response = $this->actingAs($this->user)->post($this->app_url . '/ajax/conversations/', ['members' => $members], $this->headers);
        $response->assertStatus(200);
        // dd($response);

        $members = \App\Models\Contact::where('user_id', '<>', $this->user->id)->get()->take(2)->pluck('contact_user_id')->toArray();
        $response = $this->actingAs($this->user)->post($this->app_url . '/ajax/conversations/', ['members' => $members], $this->headers);
        $response->assertStatus(403);
    }

    public function testUpdate()
    {
        $conversation = \App\Models\Conversation::where('user_id', $this->user->id)->first();
        $response = $this->actingAs($this->user)->put($this->app_url . '/ajax/conversations/' . $conversation->id, $conversation->toArray(), $this->headers);
        $response->assertStatus(200);

        $conversation = \App\Models\Conversation::where('user_id', '<>', $this->user->id)->first();
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

        $conversation = \App\Models\Conversation::where('user_id', '<>', $this->user->id)->first();
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/conversations/' . $conversation->id . '/files', $conversation->toArray(), $this->headers);
        $response->assertStatus(403);
    }
}
