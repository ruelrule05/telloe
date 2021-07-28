<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Mockery;
use Mockery\MockInterface;

class NotesTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    // public function testIndex()
    // {
        // $this->withoutAuthorization();
        // $data = [
        //     'conversation_id' => 1
        // ];
        // $this->withoutExceptionHandling();
        // $mock = Mockery::mock('Illuminate\Contracts\Auth\Access\Gate');
        // $mock->shouldReceive('authorize')->with('getNotes')->once()->andReturn(true);
        // $mock->shouldReceive('getNotes')->once()->andReturn(true);
        // $mock->shouldReceive('can')->withArgs(['getNotes', 1])->andReturn(true);
        // $this->app->instance('Illuminate\Contracts\Auth\Access\Gate', $mock);

        // $mock = $this->partialMock(AuthManager::class, function ($mock) use ($userProvider) {
        //     $mock->shouldReceive('authorize')
        //         ->once()
        //         ->andReturn($userProvider);
        // });
        // $this->app->instance('auth', $mock);

        // $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/notes', $data, $this->headers);
        // $response->assertStatus(200);
        // dd($response);
    // }

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
        $this->withoutAuthorization();
        $this->note = \App\Models\Note::latest('id')->first();
        $id = $this->note->id;
        $data = [
            'notes' => 'Edit test notes',
            'tags' => json_decode('[]', true),
        ];
        $response = $this->actingAs($this->user)->put($this->app_url . '/ajax/notes/' . $id, $data, $this->headers);
        $response->assertStatus(200);
        // dd($response);
    }

    // public function testDelete()
    // {
    //     $mock = Mockery::mock('Illuminate\Contracts\Auth\Access\Gate');
    //     $mock->shouldReceive('delete')->once()->andReturn(true);
    //     $this->note = \App\Models\Note::latest('id')->first();
    //     $id = $this->note->id;
    //     $response = $this->actingAs($this->user)->delete($this->app_url . '/ajax/notes/' . $id, $this->headers);
    //     $response->assertStatus(200);
    // }

}
