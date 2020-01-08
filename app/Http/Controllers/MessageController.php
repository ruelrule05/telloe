<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Message;
use File;

class MessageController extends Controller
{
    //

    public function index(Request $request)
    {
    	$messages = Message::orderBy('created_at', 'ASC')->get();
    	return response()->json($messages);
    }

    public function store(Request $request)
    {	
    	$requestData = $request->all();
    	if ($request->type == 'video' && $request->hasFile('video') && $request->file('video')->isValid()) :
	    	if ($request->hasFile('video') && $request->file('video')->isValid()) :
	    	 	$extension = $request->video->extension();
	            $fileName = 'video-' . time() . '.' . $extension;
	            $request->file('video')->storeAs('public/message-media/', $fileName);
	            $destination ='storage/message-media/' . $fileName;
	           	$requestData['message'] = '/' . $destination;
	        endif;
	    	if ($request->hasFile('videoPreview') && $request->file('videoPreview')->isValid()) :
	    	 	$extension = $request->videoPreview->extension();
	            $fileName = 'preview-' . time() . '.' . $extension;
	            $request->file('videoPreview')->storeAs('public/message-media/', $fileName);
	            $destination ='storage/message-media/' . $fileName;
	           	$requestData['preview'] = '/' . $destination;
	        endif;
        endif;
    	$message = Message::create($requestData);
    	return response()->json($message);
    }
}
