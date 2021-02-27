<?php

namespace App\Http\Controllers;

use App\Http\Requests\IndexNoteRequest;
use App\Http\Requests\StoreNoteRequest;
use App\Http\Requests\UpdateNoteRequest;
use App\Services\NoteService;

class NoteController extends Controller
{
    //
    public function index(IndexNoteRequest $request)
    {
        return response(NoteService::index($request));
    }

    public function store(StoreNoteRequest $request)
    {
        return response(NoteService::store($request));
    }

    public function update($id, UpdateNoteRequest $request)
    {
        return response(NoteService::update($id, $request));
    }

    public function destroy($id)
    {
        $note = new NoteService();
        return response($note->delete($id));
    }
}
