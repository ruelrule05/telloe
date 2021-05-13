<?php

namespace App\Services;

use \Facebook\Facebook;
use App\Models\Inquiry;
use App\Models\Message;
use Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class InquiryService
{
    use AuthorizesRequests;

    public static function index(Request $request)
    {
        $inquiries = [];
        if (Auth::user()->widget) {
            $inquiries = Auth::user()->widget->inquiries->load('user', 'inquiryType', 'inquiryMedia');
        }

        return $inquiries;
    }

    public function show($id)
    {
        $inquiry = Inquiry::with('user', 'inquiryMedia', 'inquiryType')->findOrFail($id);
        $this->authorize('show', $inquiry);

        return $inquiry;
    }

    public function postMessage($id, Request $request)
    {
        $inquiry = Inquiry::findOrFail($id);
        $this->authorize('postMessage', $inquiry);

        $message = $request->message;
        $preview = '';
        if ($request->type == 'video' && $request->hasFile('video') && $request->file('video')->isValid()) {
            if ($request->hasFile('video') && $request->file('video')->isValid()) {
                $extension = $request->video->extension();
                $fileName = 'video-' . time() . '.' . $extension;
                $request->file('video')->storeAs('public/message-media/', $fileName);
                $destination = 'storage/message-media/' . $fileName;
                $message = '/' . $destination;
            }
            if ($request->hasFile('videoPreview') && $request->file('videoPreview')->isValid()) {
                $extension = $request->videoPreview->extension();
                $fileName = 'preview-' . time() . '.' . $extension;
                $request->file('videoPreview')->storeAs('public/message-media/', $fileName);
                $destination = 'storage/message-media/' . $fileName;
                $preview = '/' . $destination;
            }
        }
        $message = Message::create([
            'inquiry_id' => $inquiry->id,
            'user_id' => Auth::user()->id,
            'message' => $message,
            'type' => $request->type,
            'preview' => $preview,
        ]);
        return response()->json($message->load('user'));
    }

    public static function store(Request $request)
    {
        return ;
    }

    public static function update($id, Request $request)
    {
        return ;
    }

    public static function delete($id)
    {
        return ;
    }

    public static function messengerNotify()
    {
        $facebook = new Facebook([
            'app_id' => '1187408638266444',
            'app_secret' => '89e9f7be3a3d38d7e0b0f332d7a5fc02',
            'graph_api_version' => 'v5.0',
        ]);
        $facebookRequest = $facebook->request(
            'POST',
            '/me/messages',
            [
                'access_token' => 'EAAQ38R4WTEwBAAArvJrFSYHsF3WHSpaV4NcVk9spHu1l8BPz59nwJqw4yovYWzcx1OUirdR6OblqTds5kLDpXT57pyh0eoSXTBWwf61jpZCuhqIdTv2qy7s7QvXsOmMzMY4a9TYJvCQzW2K9nVJgM0Ao1B6D6ZA0j87pEtVjhKex4Npv4N',
                'recipient' => [
                    'id' => '3011644205562087'
                ],
                'message' => [
                    'text' => 'test message'
                ]
            ]
        );
        return  $facebook->getClient()->sendRequest($facebookRequest);
    }
}
