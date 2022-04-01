<?php

namespace App\Services;

use App\Http\Requests\StoreContactNoteRequest;
use App\Http\Requests\UpdateContactNoteRequest;
use App\Models\Contact;
use App\Models\ContactNote;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ContactNoteService
{
    use AuthorizesRequests;

    public static function index()
    {
        return ;
    }

    public static function show($id)
    {
        return ;
    }

    public static function store(StoreContactNoteRequest $request)
    {
        if ($request->contact_id) {
            Contact::findOrFail($request->contact_id);
        }

        $contactNote = ContactNote::create([
            'contact_id' => $request->contact_id,
            'note' => $request->note,
            'linkedin_user' => $request->linkedin_user,
        ]);

        return $contactNote;
    }

    public static function update($id, UpdateContactNoteRequest $request)
    {
        $contactNote = ContactNote::findOrFail($id);
        $contactNote->update([
            'note' => $request->note,
        ]);
        return $contactNote;
    }

    public static function delete($id)
    {
        return ;
    }

    public function destroy($id)
    {
        $contactNote = ContactNote::findOrFail($id);
        if ($contactNote->contact_id) {
            $contact = Contact::findOrFail($contactNote->contact_id);
            $this->authorize('update', $contact);
        }
        $contactNote->delete();
        return ['success' => true];
    }
}
