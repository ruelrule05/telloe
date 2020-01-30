<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Inquiry;
use App\Models\Message;
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
        $inquiry = Inquiry::with('user', 'messages.user', 'inquiryMedia')->findOrFail($id);
        $this->authorize('show', $inquiry);

        return response()->json($inquiry);
    }

    public function postMessage($id, Request $request)
    {
        $inquiry = Inquiry::findOrFail($id);
        $this->authorize('postMessage', $inquiry);

        $message = $request->message;
        $preview = '';
        if ($request->type == 'video' && $request->hasFile('video') && $request->file('video')->isValid()) :
            if ($request->hasFile('video') && $request->file('video')->isValid()) :
                $extension = $request->video->extension();
                $fileName = 'video-' . time() . '.' . $extension;
                $request->file('video')->storeAs('public/message-media/', $fileName);
                $destination ='storage/message-media/' . $fileName;
                $message = '/' . $destination;
            endif;
            if ($request->hasFile('videoPreview') && $request->file('videoPreview')->isValid()) :
                $extension = $request->videoPreview->extension();
                $fileName = 'preview-' . time() . '.' . $extension;
                $request->file('videoPreview')->storeAs('public/message-media/', $fileName);
                $destination ='storage/message-media/' . $fileName;
                $preview = '/' . $destination;
            endif;
        endif;
        $message = Message::create([
            'inquiry_id' => $inquiry->id,
            'user_id' => Auth::user()->id,
            'message' => $message,
            'type' => $request->type,
            'preview' => $preview,
        ]);
        return response()->json($message->load('user'));
    }
}
