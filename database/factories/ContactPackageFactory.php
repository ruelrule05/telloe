<?php

namespace Database\Factories;

use App\Models\ContactPackage;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContactPackageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ContactPackage::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'contact_id' => 1,
            'package_id' => 1,
            'service' => 'Sample service',
        ];
    }
}
