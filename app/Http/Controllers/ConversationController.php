<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreConversationRequest;
use App\Services\ConversationService;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function index()
    {
        return response(ConversationService::index());
    }

    public function show($id)
    {
        $contactService = new ConversationService();
        return $contactService->show($id);
    }

    public function store(StoreConversationRequest $request)
    {
        return ConversationService::store($request);
    }

    public function update($id, Request $request)
    {
        $contactService = new ConversationService();
        return $contactService->update($id, $request);
    }

    public function files($id)
    {
        $contactService = new ConversationService();
        return $contactService->files($id);
    }

    public function slug($slug)
    {
        return ConversationService::slug($slug);
        // return $contactService->show($id);
    }
}
