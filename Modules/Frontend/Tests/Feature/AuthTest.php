<?php

namespace Modules\Frontend\Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Faker\Factory as Faker;
use App\Models\User;
use App\Models\PasswordReset;

class AuthTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public $app_url;
    public $headers;
    public $user;
    public $faker;

    public function setUp() : void
    {
        parent::setUp();
        $this->app_url = env('APP_URL') . '/ajax';
        $this->headers = [
            'HTTP_X-Requested-With' => 'XMLHttpRequest',
            'HTTP_Accept' => 'application/json'
        ];
        $this->user = User::first();
        $this->faker = Faker::create();
    }
    
    
    public function testGet() // vendor/bin/phpunit --filter AuthTest::testGet
    {
        $response = $this->actingAs($this->user)->get($this->app_url . '/auth', $this->headers);
        $response->assertStatus(200);
    }


    public function testUpdate()
    {
        $data = $this->user->toArray();
        $response = $this->actingAs($this->user)->post($this->app_url . '/auth', $data, $this->headers);
        $response->assertStatus(200);
    }


    public function testUpdatePassword()
    {

        $data = [
            'current_password' => 'admin',
            'password' => 'admin',
            'password_confirmation' => 'admin',
        ];
        $response = $this->actingAs($this->user)->put($this->app_url . '/auth/password', $data, $this->headers);
        $response->assertStatus(200);

    }


    public function testLogin()
    {   

        // Form
        $this->refreshApplication();
        $data = [
            'email' => $this->user->email,
            'password' => 'admin',
        ];
        $response = $this->post($this->app_url . '/login', $data, $this->headers);
        $response->assertStatus(200);


        $this->refreshApplication();
        $data = [
            'email' => $this->user->email,
            'password' => 'adminx',
        ];
        $response = $this->post($this->app_url . '/login', $data, $this->headers);
        $response->assertStatus(403);




        // Facebook (Login or signup)
        $this->refreshApplication();
        $data = [
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'id' => '1234556789',
        ];
        $response = $this->post($this->app_url . '/login/facebook', $data, $this->headers);
        $response->assertStatus(200);

        $this->refreshApplication();
        $data['id'] = '123456';
        $response = $this->post($this->app_url . '/login/facebook', $data, $this->headers);
        $response->assertStatus(403);




        // Google (Login or signup)
        $this->refreshApplication();
        $data = [
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'id' => '109221873481693229502',
            'image_url' => 'https://avatars3.githubusercontent.com/u/27495917?s=460&u=200cc229a0f1ece9b1e6f685f9a4e4c7e9c0da0d&v=4'
        ];
        $response = $this->post($this->app_url . '/login/google', $data, $this->headers);
        $response->assertStatus(200);
        
        $this->refreshApplication();
        $data['id'] = '123456';
        $response = $this->post($this->app_url . '/login/google', $data, $this->headers);
        $response->assertStatus(403);

    }


    public function testSignup()
    {   

        // Form
        $this->refreshApplication();
        $data = [
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'password' => $this->faker->password,
        ];
        $response = $this->post($this->app_url . '/signup', $data, $this->headers);
        $response->assertStatus(200);


        $this->refreshApplication();
        $response = $this->post($this->app_url . '/signup', $data, $this->headers);
        $response->assertStatus(403); 
    }

    
    public function testRecover()
    {
        $data = [
            'email' => $this->user->email,
        ];
        $response = $this->post($this->app_url . '/recover', $data, $this->headers);
        $response->assertStatus(200);


        $data = [
            'email' => 'gaa@dsd.comx',
        ];
        $response = $this->post($this->app_url . '/recover', $data, $this->headers);
        $response->assertStatus(404);
    }


    
    public function testReset()
    {
        $passwordReset = PasswordReset::first();
        if(!$passwordReset) return $this->assertTrue(true);

        $data = [
            'token' => $passwordReset->token,
            'password' => 'admin',
            'password_confirmation' => 'admin',
        ];
        $response = $this->post($this->app_url . '/reset', $data, $this->headers);
        $response->assertStatus(200);

        $passwordReset = PasswordReset::first();
        if(!$passwordReset) return $this->assertTrue(true);
        $data = [
            'token' => $passwordReset->token,
            'password' => 'admin',
            'password_confirmation' => 'adminx',
        ];
        $response = $this->post($this->app_url . '/reset', $data, $this->headers);
        $response->assertStatus(422);

        $data['token'] = 'non_existent';
        $response = $this->post($this->app_url . '/reset', $data, $this->headers);
        $response->assertStatus(404);
    }

    public function testUpdateStripeAccount()
    {
        echo 'sds';
    }
}
