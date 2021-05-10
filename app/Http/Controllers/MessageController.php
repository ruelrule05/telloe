<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMessageRequest;
use App\Services\MessageService;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    //

    public function store(StoreMessageRequest $request)
    {
        return response(MessageService::store($request));
    }

    public function show($id, Request $request)
    {
        $message = new MessageService();
        return $message->show($id, $request);
    }

    public function update($id, Request $request)
    {
        return response(MessageService::update($id, $request));
    }

    public function destroy($id)
    {
        return response(MessageService::destroy($id));
    }

    public function generateLinkPreview($id, Request $request)
    {
        $message = new MessageService();
        return response($message->generateLinkPreview($id, $request));
    }
}
