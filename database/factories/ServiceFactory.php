<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

class ServiceFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Service::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => 'Sample service',
            'description' => 'Service description',
            'duration' => 30,
            'days' => 2,
            'default_rate' => 20,
            'user_id' => 1,
            'parent_service_id' => 1,
        ];
    }
}
