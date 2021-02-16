<?php

namespace App\Services;

use App\Models\Plan;
use Illuminate\Http\Request;

class PlanService
{
    public static function index()
    {
        $plans = Plan::all();
        return $plans;
    }

    public static function show($id)
    {
        return ;
    }

    public static function store(Request $request)
    {
        return ;
    }

    public static function update($id, Request $request)
    {
        return ;
    }

    public static function delete($id)
    {
        return ;
    }
}
