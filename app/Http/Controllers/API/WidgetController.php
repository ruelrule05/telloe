<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Widget;
use App\Models\InquiryType;
use Nesk\Puphpeteer\Puppeteer;
use Nesk\Rialto\Data\JsFunction;

class WidgetController extends Controller
{
    public function __construct()
    {
        auth()->setDefaultDriver('api');
    }

    public function show(Request $request)
    {
    	$widget = Widget::with('widgetRules')->where('domain', $request->domain)->first();
    	if (!$widget) return abort(401, 'This domain is not registered to Snapturebox.');

    	return response()->json($widget);
    }

    public function inquiryTypes() 
    {
        return response()->json(InquiryType::orderBy('type', 'ASC')->get());
    }

    public function getIGImages(Request $request)
    {
        $puppeteer = new Puppeteer;
        $browser = $puppeteer->launch();
        $page = $browser->newPage();
        $page->goto('https://www.instagram.com/explore/tags/' . preg_replace('/\s+/', '', $request->tag));
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
}
