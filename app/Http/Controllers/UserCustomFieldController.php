<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\UserCustomFieldService;

class UserCustomFieldController extends Controller
{
    public function index()
    {
        return response(UserCustomFieldService::index());
    }

    public function store(Request $request)
    {
        return response(UserCustomFieldService::store($request));
    }
}
