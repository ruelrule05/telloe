<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Models\Note;
use File;
use Auth;

class NoteController extends Controller
{
    //
    public function index(Request $request)
    {
        $this->validate($request, [
            'conversation_id' => 'required|exists:conversations,id'
        ]);
        $conversation = Conversation::findOrFail($request->conversation_id);
        $this->authorize('getNotes', $conversation);

        return response()->json($conversation->notes);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'conversation_id' => 'required|exists:conversations,id',
            'notes' => 'required',
        ]);
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


    public function update($id, Request $request)
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
