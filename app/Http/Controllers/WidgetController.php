<?php

namespace App\Http\Controllers;

use App\Http\Requests\WidgetAddRuleRequest;
use App\Http\Requests\WidgetUpdateIntegrationRequest;
use App\Services\WidgetService;
use Illuminate\Http\Request;

class WidgetController extends Controller
{
    //
    public function showPublic($slug, Request $request)
    {
        return WidgetService::showPublic($slug, $request);
    }

    public function show(Request $request)
    {
        return response(WidgetService::show());
    }

    public function addRule(WidgetAddRuleRequest $request)
    {
        return response(WidgetService::addRule($request));
    }

    public function deleteRule($id, Request $request)
    {
        return response(WidgetService::deleteRule($id, $request));
    }

    public function facebookPageTab(Request $request)
    {
        return WidgetService::facebookPageTab($request);
    }

    public function updateIntegration(WidgetUpdateIntegrationRequest $request)
    {
        return WidgetService::updateIntegration($request);
    }

    public function customerInformation($slug)
    {
        return response(WidgetService::customerInformation($slug));
    }

    public function plans()
    {
        return response(WidgetService::plans());
    }

    public function update(Request $request)
    {
        return WidgetService::update($request);
    }
}
