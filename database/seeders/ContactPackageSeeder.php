<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ContactPackage;

class ContactPackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ContactPackage::factory(1)->create();
    }
}
