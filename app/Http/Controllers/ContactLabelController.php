<?php

namespace App\Http\Controllers;

use App\Services\ContactLabelService;
use Illuminate\Http\Request;

class ContactLabelController extends Controller
{
    public function index()
    {
        return ContactLabelService::index();
    }

    public function store(Request $request)
    {
        return ContactLabelService::store($request);
    }
}