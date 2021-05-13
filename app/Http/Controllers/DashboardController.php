<?php

namespace App\Http\Controllers;

use App\Http\Requests\DashboardSearchTagsRequest;
use App\Services\DashboardService;

class DashboardController extends Controller
{
    public function searchTags(DashboardSearchTagsRequest $request)
    {
        return response(DashboardService::searchTags($request));
    }

    public function stripeInvoices()
    {
        return DashboardService::stripeInvoices();
    }
}
