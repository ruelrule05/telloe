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
        $response->assertStatus(200);
    }


    public function testStoreAudio()
    {
        $conversation = \App\Models\Conversation::where('user_id', $this->user->id)->first();
        $file = UploadedFile::fake()->image(public_path('storage/message-media/1600853149-source'));
        $data = [
            'conversation_id' => $conversation->id,
            'type' => 'audio',
            'message' => 'audio',
            'source' => $file,
        ];
        $response = $this->actingAs($this->user)->post($this->app_url . '/ajax/messages', $data, $this->headers);
        $response->assertStatus(200);
    }


    public function testStoreVideo()
    {
        $conversation = \App\Models\Conversation::where('user_id', $this->user->id)->first();
        $file = UploadedFile::fake()->image(public_path('storage/message-media/1597902259-source.mp4'));
        $data = [
            'conversation_id' => $conversation->id,
            'type' => 'video',
            'message' => 'video',
            'source' => $file,
        ];
        $response = $this->actingAs($this->user)->post($this->app_url . '/ajax/messages', $data, $this->headers);
        $response->assertStatus(200);
    }


    public function testStoreFile()
    {
        $conversation = \App\Models\Conversation::where('user_id', $this->user->id)->first();
        $file = UploadedFile::fake()->image(public_path('storage/message-media/1600853014-source'));
        $data = [
            'conversation_id' => $conversation->id,
            'type' => 'file',
            'message' => 'file',
            'source' => $file,
        ];
        $response = $this->actingAs($this->user)->post($this->app_url . '/ajax/messages', $data, $this->headers);
        $response->assertStatus(200);
    }

    public function testGenerateLinkPreview()
    {
        $conversation = \App\Models\Conversation::where('user_id', $this->user->id)->first();
        $data = [
            'conversation_id' => $conversation->id,
            'type' => 'text',
            'message' => 'https://google.com'
        ];
        $response = $this->actingAs($this->user)->post($this->app_url . '/ajax/messages', $data, $this->headers);
        $id = $response->getData()->id;

        $response = $this->actingAs($this->user)->get($this->app_url . "/ajax/messages/$id/generate_link_preview", $this->headers);
        $response->assertStatus(200);
    }
}
