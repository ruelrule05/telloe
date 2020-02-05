<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Inquiry;
use App\Models\InquiryMedia;
use File;

class InquiryController extends Controller
{
    public function __construct()
    {
        auth()->setDefaultDriver('api');
    }

    public function store(Request $request)
    {   
        $this->validate($request, [
            'widget_id' => 'required|exists:widgets,id',
            'message' => 'required',
            'inquiry_type_id' => 'required|exists:inquiry_types,id',
            'interests' => 'required|array',
            'items' => 'required|array',
        ]);

        $inquiry = Inquiry::create([
            'widget_id' => $request->widget_id,
            'user_id' => auth()->user()->id,
            'message' => $request->message,
            'inquiry_type_id' => $request->inquiry_type_id,
            'interest' => $request->interest['value'],
        ]);

        $i = 1;
        $time = time();
        foreach ($request->items as $item) :
            // Source
            $source = $item['item']['src'];
            $mime = substr($source, 5, strpos($source, ';')-5);
            $extension = explode('/', $mime)[1];
            $filename = $time . '-media-' . $i;
            $mediaDestination = 'storage/inquiry-media/' . $filename . '.' . $extension;
            $media = base64_decode(substr($source, strpos($source, ',') + 1));
            File::put($mediaDestination, $media);

            // Preview
            $source = $item['item']['preview'];
            $mime = substr($source, 5, strpos($source, ';')-5);
            $extension = explode('/', $mime)[1];
            $filename = $time . '-preview-' . $i;
            $previewDestination = 'storage/inquiry-media/' . $filename . '.' . $extension;
            $preview = base64_decode(substr($source, strpos($source, ',') + 1));
            File::put($previewDestination, $preview);

            InquiryMedia::create([
                'inquiry_id' => $inquiry->id,
                'media' => '/' . $mediaDestination,
                'type' => $item['item']['type'],
                'preview' => '/' . $previewDestination
            ]);

            $i++;
        endforeach;

        return response()->json(['success' => true]);
    }
}
