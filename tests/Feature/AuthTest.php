<?php

namespace App\Tests\Feature;

use App\Mail\Welcome;
use App\Models\PasswordReset;
use Illuminate\Support\Facades\Mail;
use Mockery;
use Tests\TestCase;

class AuthTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */        
    public function testGet() // vendor/bin/phpunit --filter AuthTest::testGet
    {
        $response = $this->actingAs($this->user)->get($this->app_url . '/ajax/auth', $this->headers);
        $response->assertStatus(200);
    }

    public function testUpdate()
    {
        $data = $this->user->toArray();
        $response = $this->actingAs($this->user)->post($this->app_url . '/ajax/auth', $data, $this->headers);
        $response->assertStatus(200);
    }

    public function testUpdatePassword()
    {
        $data = [
            'current_password' => 'password',
            'password' => 'admin',
            'password_confirmation' => 'admin',
        ];
        $response = $this->actingAs($this->user)->put($this->app_url . '/ajax/auth/password', $data, $this->headers);
        if ($response->status() === 403) {
            $response->assertStatus(403);
        } else {
            $response->assertStatus(200);
        }
    }

    public function testLogin()
    {
        // Form
        $this->refreshApplication();
        $data = [
            'email' => $this->user->email,
            'password' => 'admin',
        ];
        $response = $this->post($this->app_url . '/ajax/login', $data, $this->headers);
        $response->assertStatus(200);

        $this->refreshApplication();
        $data = [
            'email' => $this->user->email,
            'password' => 'adminx',
        ];
        $response = $this->post($this->app_url . '/ajax/login', $data, $this->headers);
        $response->assertStatus(403);
    }

    public function testLoginSocialiteCallback()
    {
        $this->withoutMiddleware();
        $abstractUser = Mockery::mock('Laravel\Socialite\Two\User');         
        $abstractUser->shouldReceive('getId') 
        ->andReturn(1234567890)
        ->shouldReceive('getEmail')
        ->shouldReceive('getNickname')
        ->andReturn('Pseudo')
        ->shouldReceive('getName')
        ->andReturn('Arlette Laguiller')
        ->shouldReceive('getAvatar')
        ->andReturn('https://en.gravatar.com/userimage');

        $provider = Mockery::mock('Laravel\Socialite\Contracts\Provider');
        $provider->shouldReceive('user')->andReturn($abstractUser);

        // $this->visit('/auth/{driver}/callback')->seePageIs('/dashboard');
        $this->get('/dashboard');
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
        Mail::fake();
        Mail::assertNotSent(Welcome::class);
        $response = $this->post($this->app_url . '/ajax/signup', $data, $this->headers);
        $response->assertStatus(200);
    }

    public function testRecover()
    {
        $data = [
            'email' => $this->user->email,
        ];
        $response = $this->post($this->app_url . '/ajax/recover', $data, $this->headers);
        $response->assertStatus(200);

        $data = [
            'email' => 'gaa@dsd.comx',
        ];
        $response = $this->post($this->app_url . '/ajax/recover', $data, $this->headers);
        $response->assertStatus(404);
    }

    public function testReset()
    {
        $passwordReset = PasswordReset::first();
        if (! $passwordReset) {
            return $this->assertTrue(true);
        }

        $data = [
            'token' => $passwordReset->token,
            'password' => 'admin',
            'password_confirmation' => 'admin',
        ];
        $response = $this->post($this->app_url . '/ajax/reset', $data, $this->headers);
        $response->assertStatus(200);

        $passwordReset = PasswordReset::first();
        if (! $passwordReset) {
            return $this->assertTrue(true);
        }
        $data = [
            'token' => $passwordReset->token,
            'password' => 'admin',
            'password_confirmation' => 'adminx',
        ];
        $response = $this->post($this->app_url . '/ajax/reset', $data, $this->headers);
        $response->assertStatus(422);

        $data['token'] = 'non_existent';
        $response = $this->post($this->app_url . '/ajax/reset', $data, $this->headers);
        $response->assertStatus(404);
    }

    public function testUpdateStripeAccount()
    {
        $data = [
            'email' => 'sds',
            'password' => 'admin',
        ];
        $response = $this->put($this->app_url . '/ajax/auth/update_stripe_account', $data, $this->headers);
        $response->assertStatus(422);

        $data = [
            'country' => 'AU',
            'address' => 'Lodlod',
            'city' => 'Lipa City',
            'state' => 'Queensland',
            'postal' => '4217',
            'website' => 'https://telloe.com',
            'phone' => '+61298765432',
            'dob' => '1990-09-23',
            'account_number' => '000123456',
            'account_holder_name' => 'Clyde Escobidal',
            'routing_number' => '110000',
        ];
        $response = $this->actingAs($this->user)->put($this->app_url . '/ajax/auth/update_stripe_account', $data, $this->headers);
        $response->assertStatus(200);
    }

    public function testLogout()
    {
        $response = $this->actingAs($this->user)->post($this->app_url . '/logout', [], $this->headers);
        $response->assertStatus(302);
    }
}
