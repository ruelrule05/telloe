<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Faker\Generator as Faker;
use Illuminate\Support\Str;


class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        // $json = (Object)[];
        // DB::table('users')->insert([
        //     'first_name' => $faker->firstName,
        //     'last_name' => $faker->lastName,
        //     'email' => $faker->unique()->safeEmail,
        //     'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        //     'blocked_timeslots' => json_encode($json)
        // ]);
        User::factory(1)->create();
    }
}
