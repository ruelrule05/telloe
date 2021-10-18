<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\ChangePasswordRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\SignupRequest;
use App\Http\Requests\Auth\UpdateStripeAccountRequest;
use App\Http\Requests\Auth\UpdateUserRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function socialiteCallback($driver, Request $request)
    {
        return AuthService::socialiteCallback($driver, $request);
    }

    public function get(Request $request, $last_online = true)
    {
        return response(AuthService::get($request, $last_online));
    }

    public function login(LoginRequest $request)
    {
        return response(AuthService::login($request));
    }

    public function signup(SignupRequest $request)
    {
        return response(AuthService::signup($request));
    }

    public function logout()
    {
        return AuthService::logout();
    }

    public function recover(Request $request)
    {
        return response(AuthService::recover($request));
    }

    public function reset(Request $request)
    {
        $this->validate($request, [
            'password' => 'required|string|confirmed|max:255',
        ]);
        return response(AuthService::reset($request));
    }

    public function update(UpdateUserRequest $request)
    {
        return response(AuthService::update($request));
    }

    public function updatePassword(ChangePasswordRequest $request)
    {
        return response(AuthService::updatePassword($request));
    }

    public function updateStripeAccount(UpdateStripeAccountRequest $request)
    {
        return response(AuthService::updateStripeAccount($request));
    }

    public function createGuestAccount(Request $request)
    {
        $this->validate($request, [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email'
        ]);
        return AuthService::createGuestAccount($request);
    }

    public function setup()
    {
        return AuthService::setup();
    }
}
