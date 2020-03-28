<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Widget;
use App\Models\InquiryType;
use App\Models\Chatbox;
use App\Models\Chatbot;
use Nesk\Puphpeteer\Puppeteer;
use Nesk\Rialto\Data\JsFunction;
use DB;
use Response;
use File;

class WidgetController extends Controller
{
    public function __construct()
    {
        auth()->setDefaultDriver('api');
    }

    public function script()
    {
        $script = File::get(public_path().'/js/widget/widget.js');
        $response = Response::make($script);
        $response->header('Content-Type', "text/js");
        return $response;
    }

    public function show(Request $request)
    {
        $request->widget->load('bookings');
        if ($request->wp_post) :
            $wp_post_bookings = DB::table('bookings')->whereJsonContains('metadata->wp_post_id', $request->wp_post->ID)->get();
            $request->widget->setRelation('bookings', $wp_post_bookings);
        endif;

        return response()->json($request->widget);
    }

    public function inquiryTypes() 
    {
        return response()->json(InquiryType::orderBy('id', 'ASC')->get());
    }

    public function getIGImages(Request $request)
    {
        $this->validate($request, [
            'tag' => 'required'
        ]);
        $puppeteer = new Puppeteer;
        $browser = $puppeteer->launch();
        $page = $browser->newPage();
        $tag = ltrim($request->tag, '#');
        $page->goto('https://www.instagram.com/explore/tags/' . preg_replace('/\s+/', '', $tag));
        $sharedData = $page->evaluate(JsFunction::createWithBody("
            return _sharedData;
        "));
        $edges = $sharedData['entry_data']['TagPage'][0]['graphql']['hashtag']['edge_hashtag_to_media']['edges'];
        $images = [];
        foreach ($edges as $edge) :
            $images[] = $edge['node']['thumbnail_src']; //display_url or thumbnail_src
        endforeach;
        $browser->close();

        return response()->json($images);
    }

    public function getMedia($media)
    {
        $file = public_path().'/'.$media;
        if(!File::exists($file)) return abort(404);
        
        $media = File::get($file);
        $response = Response::make($media);
        return $media;
    }

}
