<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Models\Note;
use File;
use Auth;

class NoteController extends Controller
{
    //

    public function store(Request $request)
    {
        $this->validate($request, [
            'conversation_id' => 'required|exists:conversations,id',
            'notes' => 'required',
        ]);
        $conversation = Conversation::findOrFail($request->conversation_id);
        $this->authorize('postNote', $conversation);

        $note = Note::create([
            'conversation_id' => $conversation->id,
            'notes' => $request->notes,
        ]);

        return response()->json($note);
    }


    public function destroy($id)
    {
        $note = Note::findOrFail($id);
        $this->authorize('delete', $note);
        $note->delete();
        return response()->json(['success' => true]);
    }

}
