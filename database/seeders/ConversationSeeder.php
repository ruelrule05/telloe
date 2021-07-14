<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ConversationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('conversations')->insert([
            'user_id' => 1,
            'name' => 'Sample convo',
            'created_at' => '2021-07-11 07:30:39',
        ]);
    }
}
