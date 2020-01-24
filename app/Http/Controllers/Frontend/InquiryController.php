<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Inquiry;
use Auth;

class InquiryController extends Controller
{
    //

    public function index(Request $request)
    {
        $inquiries = Auth::user()->widget->inquiries->load('user');

        return response()->json($inquiries);
    }

    public function show($id, Request $request)
    {
        $inquiry = Inquiry::with('user', 'messages', 'inquiryMedia')->findOrFail($id);
        $this->authorize('show', $inquiry);

        return response()->json($inquiry);
    }

}
