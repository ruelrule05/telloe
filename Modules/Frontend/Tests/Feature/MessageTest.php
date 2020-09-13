<?php

namespace Modules\Frontend\Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;

class MessageTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testStoreText()
    {
        $conversation = \App\Models\Conversation::where('user_id', $this->user->id)->first();
        $data = [
            'conversation_id' => $conversation->id,
            'type' => 'text',
            'message' => 'Test Message'
        ];
        $response = $this->actingAs($this->user)->post($this->app_url . '/ajax/messages', $data, $this->headers);
        $response->assertStatus(200);

        $data['conversation_id'] = '117';
        $response = $this->actingAs($this->user)->post($this->app_url . '/ajax/messages', $data, $this->headers);
        $response->assertStatus(422);
    }

    public function testStoreEmoji()
    {
        $conversation = \App\Models\Conversation::where('user_id', $this->user->id)->first();
        $data = [
            'conversation_id' => $conversation->id,
            'type' => 'emoji',
            'message' => '🙂'
        ];
        $response = $this->actingAs($this->user)->post($this->app_url . '/ajax/messages', $data, $this->headers);
        $response->assertStatus(200);
    }

    public function testStoreImage()
    {
        $conversation = \App\Models\Conversation::where('user_id', $this->user->id)->first();
        $file = UploadedFile::fake()->image(public_path('images/video.png'));
        $data = [
            'conversation_id' => $conversation->id,
            'type' => 'image',
            'message' => 'image',
            'source' => $file,
        ];
        $response = $this->actingAs($this->user)->post($this->app_url . '/ajax/messages', $data, $this->headers);
        $response->dump();
        $response->assertStatus(200);
    }
}
