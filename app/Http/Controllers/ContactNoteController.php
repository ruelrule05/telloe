<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\ContactNote;
use App\Http\Requests\StoreContactNoteRequest;
use App\Http\Requests\UpdateContactNoteRequest;

class ContactNoteController extends Controller
{
    public function store(StoreContactNoteRequest $request)
    {
        $contact = Contact::findOrFail($request->contact_id);
        $this->authorize('show', $contact);

        $contactNote = ContactNote::create([
            'contact_id' => $contact->id,
            'note' => $request->note,
        ]);

        return response()->json($contactNote);
    }

    public function update($id, UpdateContactNoteRequest $request)
    {
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
