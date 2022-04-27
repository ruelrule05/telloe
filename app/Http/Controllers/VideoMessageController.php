<?php

namespace App\Http\Controllers;

use App\Models\VideoMessage;
use App\Services\VideoMessageService;
use Illuminate\Http\Request;

class VideoMessageController extends Controller
{
    public function index(Request $request)
    {
        return VideoMessageService::index($request);
    }

    public function store(Request $request)
    {
        return VideoMessageService::store($request);
    }

    public function show(VideoMessage $videoMessage)
    {
        return VideoMessageService::show($videoMessage);
    }

    public function update(VideoMessage $videoMessage, Request $request)
    {
        return VideoMessageService::update($videoMessage, $request);
    }

    public function destroy(VideoMessage $videoMessage)
    {
        return VideoMessageService::destroy($videoMessage);
    }

    public function toggleLike(VideoMessage $videoMessage, Request $request)
    {
        return VideoMessageService::toggleLike($videoMessage, $request);
    }

    public function getStats(VideoMessage $videoMessage)
    {
        return VideoMessageService::getStats($videoMessage);
    }

    public function incrementViews(VideoMessage $videoMessage)
    {
        return VideoMessageService::incrementViews($videoMessage);
    }
}
