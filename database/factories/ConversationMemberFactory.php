<?php

namespace Database\Factories;

use App\Models\ConversationMember;
use Illuminate\Database\Eloquent\Factories\Factory;

class ConversationMemberFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ConversationMember::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'conversation_id' => 1,
            'user_id' => 2
        ];
    }
}
