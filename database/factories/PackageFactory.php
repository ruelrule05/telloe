<?php

namespace Database\Factories;

use App\Models\Package;
use Illuminate\Database\Eloquent\Factories\Factory;

class PackageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Package::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => 'Test Package',
            'description' => 'Sample description',
            'user_id' => 1,
            'services' => 'Sample services',
            'expiration_date' => '2021-08-20',
            'price' => 10
        ];
    }
}
