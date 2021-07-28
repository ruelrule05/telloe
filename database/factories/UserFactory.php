<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $json = (object)[];
        $firstName = $this->faker->firstName();
        $lastName = $this->faker->lastName();
        return [
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $this->faker->unique()->safeEmail(),
            'username' => strtolower($firstName),
            'password' => '$2y$10$KrKjrMAiyji.iXRxQWoOreQbCTGhlrQWhgT.LZx2d3Eh6srJ1hd/O', // password
            'blocked_timeslots' => json_encode($json)
        ];
    }
}