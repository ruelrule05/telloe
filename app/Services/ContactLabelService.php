<?php

namespace App\Services;

use App\Models\ContactLabel;
use Auth;
use Illuminate\Http\Request;

class ContactLabelService
{
    public static function index()
    {
        return response()->json(ContactLabel::where('user_id', Auth::user()->id)->get());
    }

    public static function store(Request $request)
    {
        $contactLabel = ContactLabel::create([
            'user_id' => Auth::user()->id,
            'label' => $request->input('label'),
            'color' => $request->input('color'),
            'text_color' => $request->input('text_color'),
        ]);
        return response($contactLabel);
    }
}