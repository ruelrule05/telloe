<?php

namespace Database\Factories;

use App\Models\Conversation;
use Illuminate\Database\Eloquent\Factories\Factory;
use Str;

class ConversationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Conversation::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $slug = Str::random(32);
        return [
            'user_id' => 1,
            'name' => 'Sample convo',
            'created_at' => '2021-07-11 07:30:39',
            'slug' => $slug
        ];
    }
}
