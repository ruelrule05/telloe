<?php

namespace Database\Seeders;

use App\Models\Conversation;
use Illuminate\Database\Seeder;

class ConversationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Conversation::factory(2)->create();
        Conversation::create([
            'user_id' => 2,
            'name' => 'Sample convo 2',
            'created_at' => '2021-07-11 07:30:39',
        ]);
    }
}
