<?php

namespace App\Http\Controllers;

use App\Models\VideoCampaign;
use App\Services\VideoCampaignService;
use Illuminate\Http\Request;

class VideoCampaignController extends Controller
{
    public function index(Request $request)
    {
        return VideoCampaignService::index($request);
    }

    public function store(Request $request)
    {
        return VideoCampaignService::store($request);
    }

    public function show(VideoCampaign $videoCampaign)
    {
        return VideoCampaignService::show($videoCampaign);
    }

    public function update(VideoCampaign $videoCampaign, Request $request)
    {
        return VideoCampaignService::update($videoCampaign, $request);
    }

    public function destroy(VideoCampaign $videoCampaign)
    {
        return VideoCampaignService::destroy($videoCampaign);
    }

    public function toggleLike(VideoCampaign $videoCampaign, Request $request)
    {
        return VideoCampaignService::toggleLike($videoCampaign, $request);
    }

    public function getStats(VideoCampaign $videoCampaign)
    {
        return VideoCampaignService::getStats($videoCampaign);
    }

    public function incrementViews(VideoCampaign $videoCampaign)
    {
        return VideoCampaignService::incrementViews($videoCampaign);
    }
}
