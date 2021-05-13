<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\PlanService;

class PlanController extends Controller
{
    public function index()
    {
        return response(PlanService::index());
    }
}
