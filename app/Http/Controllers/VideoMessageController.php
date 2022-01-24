<?php

namespace App\Http\Controllers;

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

    public function storeVideo(Request $request)
    {
        return VideoMessageService::storeVideo($request);
    }
}
