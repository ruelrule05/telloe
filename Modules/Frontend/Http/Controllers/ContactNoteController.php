<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\ContactNote;
use Illuminate\Http\Request;

class ContactNoteController extends Controller
{
    public function store(Request $request)
    {
        $this->validate($request, [
            'contact_id' => 'required|exists:contacts,id',
            'note' => 'required',
        ]);
        $contact = Contact::findOrFail($request->contact_id);
        $this->authorize('show', $contact);

        $contactNote = ContactNote::create([
            'contact_id' => $contact->id,
            'note' => $request->note,
        ]);

        return response()->json($contactNote);
    }

    public function update($id, Request $request)
    {
        $this->validate($request, [
            'note' => 'required',
        ]);
        $contactNote = ContactNote::findOrFail($id);
        $contact = Contact::findOrFail($contactNote->contact_id);
        $this->authorize('update', $contact);

        $contactNote->update([
            'note' => $request->note,
        ]);
        return response($contactNote);
    }

    public function destroy($id)
    {
        $contactNote = ContactNote::findOrFail($id);
        $contact = Contact::findOrFail($contactNote->contact_id);
        $this->authorize('update', $contact);
        $contactNote->delete();
        return response()->json(['success' => true]);
    }
}
