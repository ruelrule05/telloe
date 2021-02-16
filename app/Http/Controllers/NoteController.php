<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Note;
use Auth;
use App\Http\Requests\IndexNoteRequest;
use App\Http\Requests\StoreNoteRequest;

class NoteController extends Controller
{
    //
    public function index(IndexNoteRequest $request)
    {
        $conversation = Conversation::withTrashed()->findOrFail($request->conversation_id);
        $this->authorize('getNotes', $conversation);

        return response()->json($conversation->notes);
    }

    public function store(StoreNoteRequest $request)
    {
        $conversation = Conversation::findOrFail($request->conversation_id);
        $this->authorize('addNote', $conversation);

        $note = Note::create([
            'conversation_id' => $conversation->id,
            'user_id' => Auth::user()->id,
            'notes' => $request->notes,
            'tags' => []
        ]);

        return response()->json($note);
    }

    public function update($id, UpdateNoteRequest $request)
    {
        $note = Note::findOrFail($id);
        $this->authorize('update', $note);
        $note->update([
            'notes' => $request->notes,
            'tags' => $request->tags,
        ]);
        return response()->json(['success' => true]);
    }

    public function destroy($id)
    {
        $note = Note::findOrFail($id);
        $this->authorize('delete', $note);
        $note->delete();
        return response()->json(['success' => true]);
    }
}
