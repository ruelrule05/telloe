<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Chatbot;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Services\ChatBoxService;

class ChatbotController extends Controller
{
    //

    public function index(Request $request)
    {
        return response(ChatBoxService::index($request));
    }

    public function store(Request $request)
    {
        $chatbot = Chatbot::create([
            'user_id' => Auth::user()->id,
            'title' => $request->title,
            'description' => $request->description
        ]);
        $bot_id = $chatbot->id . Str::random(10);
        $chatbot->update([
            'bot_id' => $bot_id
        ]);
        return response()->json($chatbot);
    }

    public function show($id, Request $request)
    {
        $chatbot = Chatbot::with('chatboxes')->findOrFail($id);
        $this->authorize('show', $chatbot);
        return response()->json($chatbot);
    }

    public function update($id, Request $request)
    {
        $chatbot = Chatbot::findOrFail($id);

        $this->authorize('update', $chatbot);
        $chatbot->update([
            'title' => $request->title,
            'description' => $request->description
        ]);
        return response()->json($chatbot);
    }

    public function destroy($id, Request $request)
    {
        $chatbot = Chatbot::findOrFail($id);
        $this->authorize('delete', $chatbot);
        $chatbot->delete();
        return response()->json(['deleted' => true]);
    }
}
