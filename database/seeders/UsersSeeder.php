<?php

namespace Database\Seeders;

use App\Models\User;
use Faker\Generator as Faker;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        User::factory(2)->create();
        User::create([
            'first_name' => 'Premium',
            'last_name' => 'User',
            'email' => 'premium@user.com',
            'username' => 'premiumuser',
            'password' => '$2y$10$KrKjrMAiyji.iXRxQWoOreQbCTGhlrQWhgT.LZx2d3Eh6srJ1hd/O', // password
            'blocked_timeslots' => json_encode([]),
            'is_premium' => true
        ]);
    }
}
