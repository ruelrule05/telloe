<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Chatbot;
use App\Models\Chatbox;
use Illuminate\Http\Request;

class ChatboxController extends Controller
{
    public function store(Request $request)
    {
        $chatbot = Chatbot::findOrfail($request->chatbot_id);
        $this->authorize('create_chatbox', $chatbot);

        $chatbox = Chatbox::create([
            'chatbot_id' => $chatbot->id,
            'type' => $request->type,
            'buttons' => []
        ]);

        return response()->json($chatbox);
    }

    public function update($id, Request $request)
    {
        $chatbox = Chatbox::findOrfail($id);
        $this->authorize('update', $chatbox);

        $chatbox->update($request->all());

        return response()->json($chatbox);
    }

    public function destroy($id, Request $request)
    {
        $chatbox = Chatbox::findOrfail($id);
        $this->authorize('delete', $chatbox);

        $chatbox->delete();

        return response()->json(['deleted' => true]);
    }

    public function uploadFile(Request $request)
    {
        $this->validate($request, [
            'file' => 'required|file',
        ]);
        $file = $request->file;
        $filename = $file->getClientOriginalName();
        $srcDestination = '/chatbox-media/';
        $file->storeAs('/public' . $srcDestination, $filename);
        $sourceFile = '/storage' . $srcDestination . $filename;

        return response()->json(['file' => $sourceFile]);
    }
}
