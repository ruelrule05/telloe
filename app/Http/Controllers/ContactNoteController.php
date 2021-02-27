<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactNoteRequest;
use App\Http\Requests\UpdateContactNoteRequest;
use App\Services\ContactNoteService;

class ContactNoteController extends Controller
{
    public function store(StoreContactNoteRequest $request)
    {
        return response(ContactNoteService::store($request));
    }

    public function update($id, UpdateContactNoteRequest $request)
    {
        return response(ContactNoteService::update($id, $request));
    }

    public function destroy($id)
    {
        $contactNote = new ContactNoteService();
        return response($contactNote->destroy($id));
    }
}
