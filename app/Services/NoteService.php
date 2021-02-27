<?php

namespace App\Services;

use App\Http\Requests\IndexNoteRequest;
use App\Models\Conversation;
use App\Models\Note;
use Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class NoteService
{
    use AuthorizesRequests;

    public static function index(IndexNoteRequest $request)
    {
        $conversation = Conversation::withTrashed()->findOrFail($request->conversation_id);

        return $conversation->notes;
    }

    public static function show($id)
    {
        return ;
    }

    public static function store(Request $request)
    {
        $conversation = Conversation::findOrFail($request->conversation_id);

        $note = Note::create([
            'conversation_id' => $conversation->id,
            'user_id' => Auth::user()->id,
            'notes' => $request->notes,
            'tags' => []
        ]);

        return $note;
    }

    public static function update($id, Request $request)
    {
        $note = Note::findOrFail($id);

        $note->update([
            'notes' => $request->notes,
            'tags' => $request->tags,
        ]);
        return ['success' => true];
    }

    public function delete($id)
    {
        $note = Note::findOrFail($id);
        $this->authorize('delete', $note);
        $note->delete();
        return ['success' => true];
    }
}
