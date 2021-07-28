<?php

namespace Database\Seeders;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Database\Seeder;

class ContactsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Contact::factory(2)->create();
        Contact::create([
            'user_id' => 1,
            'first_name' => 'Accepted',
            'last_name' => 'Contact',
            'email' => 'accepted@contact.com',
            'invite_token' => '0123456789',
            'is_pending' => false,
            'contact_user_id' => User::where('id', '<>', 1)->first()->id
        ]);
    }
}
