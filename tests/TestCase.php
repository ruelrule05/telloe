<?php

namespace Tests;

use Faker\Factory as Faker;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    public $app_url;
    public $headers;
    public $user;
    public $faker;

    public function setUp() : void
    {
        parent::setUp();
        $this->app_url = env('APP_URL');
        $this->headers = [
            'HTTP_X-Requested-With' => 'XMLHttpRequest',
            'HTTP_Accept' => 'application/json'
        ];
        $this->user = \App\Models\User::first();
        $this->faker = Faker::create();
    }

    public function withoutAuthorization()
    {
        \Gate::before(function () {
            return true;
        });

        return $this;
    }
}
