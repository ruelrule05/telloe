<?php

namespace App\Http\Controllers;

use App\Http\Requests\GuestBookRequest;
use App\Http\Requests\UserBookRequest;
use App\Http\Requests\UserFacebookLoginAndBook;
use App\Http\Requests\UserGoogleLoginRequest;
use App\Http\Requests\UserServiceTimeslotsRequest;
use App\Http\Requests\UserSignupAndBookRequest;
use App\Models\Widget;
use App\Services\UserService;
use Illuminate\Http\Request;
use Response;

class UserController extends Controller
{
    //
    public function index(Request $request)
    {
        return response(UserService::index($request));
    }

    public function profile($username, $service_id = null, Request $request)
    {
        return UserService::profile($username, $service_id, $request);
    }

    public function showService($username, $service_id)
    {
        return UserService::showService($username, $service_id);
    }

    public function serviceTimeslots($username, $service_id, UserServiceTimeslotsRequest $request)
    {
        return response(userService::serviceTimeslots($username, $service_id, $request));
    }

    public function widget(Request $request)
    {
        return UserService::widget($request);
    }

    public function signupAndBook($username, $service_id, UserSignupAndBookRequest $request)
    {
        return response(UserService::signupAndBook($username, $service_id, $request));
    }

    public static function book($username, $service_id, UserBookRequest $request, $customer)
    {
        return response(UserService::signupAndBook($username, $service_id, $request, $customer));
    }    

    public function googleLoginAndBook($username, $service_id, UserGoogleLoginRequest $request)
    {
        return response(UserService::googleLoginAndBook($username, $service_id, $request));
    }

    public function facebookLoginAndBook($username, $service_id, UserFacebookLoginAndBook $request)
    {
        return response(UserService::facebookLoginAndBook($username, $service_id, $request));
    }

    public function getInvoice(Request $request)
    {
        return response(UserService::getInvoice($request));
    }

    public function loginAndBook($username, $service_id, UserBookRequest $request)
    {
        return response(UserService::loginAndBook($username, $service_id, $request));
    }

    public function guestBook($username, $service_id, GuestBookRequest $request)
    {
        return response(UserService::guestBook($username, $service_id, $request));
    }
}
