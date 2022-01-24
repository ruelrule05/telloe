<?php

namespace App\Http\Controllers;

use App\Services\UserVideoService;
use Illuminate\Http\Request;

class UserVideoController extends Controller
{
    public function index(Request $request)
    {
        return UserVideoService::index($request);
    }

    public function store(Request $request)
    {
        return UserVideoService::store($request);
    }
}
