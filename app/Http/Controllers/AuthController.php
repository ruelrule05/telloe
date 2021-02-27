<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\ChangePasswordRequest;
use App\Http\Requests\Auth\LoginFacebookRequest;
use App\Http\Requests\Auth\LoginGoogleRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\SignupRequest;
use App\Http\Requests\Auth\UpdateUserRequest;
use App\Http\Requests\PasswordResetRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function socialiteCallback($driver)
    {
        return AuthService::socialiteCallback($driver);
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

    public function reset(PasswordResetRequest $request)
    {
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

    public function loginFacebook(LoginFacebookRequest $request)
    {
        return response(AuthService::loginFacebook($request));
    }

    public function loginGoogle(LoginGoogleRequest $request)
    {
        return response(AuthService::updatePassword($request));
    }

    public function updateStripeAccount(updateStripeAccount $request)
    {
        return response(AuthService::updateStripeAccount($request));
    }

    public function generateUsername(Request $request)
    {
        return response(AuthService::generateUsername($request));
    }
}
