<?php

namespace App\Services;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageService
{
    public static function index()
    {
        return ;
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
        $message = Message::findOrFail($id);
        //$this->authorize('update', $message);
        $message->update([
            'tags' => $request->tags,
        ]);
        return response()->json($message);
    }

    public static function delete($id)
    {
        return ;
    }
}
