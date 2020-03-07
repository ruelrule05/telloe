<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Widget;
use App\Models\InquiryType;
use Nesk\Puphpeteer\Puppeteer;
use Nesk\Rialto\Data\JsFunction;
use DB;

class WidgetController extends Controller
{
    public function __construct()
    {
        auth()->setDefaultDriver('api');
    }

    public function show(Request $request)
    {
        /*$authorizedDomain = ($request->domain == env('AUTHORIZED_DOMAINS'));
        if ($authorizedDomain) :
            $url_parts = array_diff(explode('/', parse_url($request->server('HTTP_REFERER'), PHP_URL_PATH)), ['']);
            $post_name = end($url_parts);
            $domain_name = explode('.', $request->domain)[0];
            $post = DB::connection($domain_name)->table('wp_posts')->where('post_name', $post_name)->first();
            print_r($post);
            return;
        endif;*/
        $request->widget->load('bookings');
        if ($request->wp_post_id) :
            $url_parts = array_diff(explode('/', parse_url($request->server('HTTP_REFERER'), PHP_URL_PATH)), ['']);
            $domain = parse_url($request->server('HTTP_REFERER'), PHP_URL_HOST);
            $domain_name = explode('.', $domain)[0];
            $post = DB::connection($domain_name)->table('wp_posts')->where('ID', $request->wp_post_id)->first();
            if ($post) :
                $wp_post_bookings = DB::table('bookings')->whereJsonContains('metadata->post_id', $post->ID)->get();
                $request->widget->setRelation('bookings', $wp_post_bookings);
            endif;
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

    public function getPageSourceCode(Request $request)
    {
        $this->validate($request, [
            'url' => 'required'
        ]);
        $data = [
            'title' => $request->url,
            'description' => '', 
            'favicon' => '',
            'url' => $request->url,
        ];
        $puppeteer = new Puppeteer;
        $browser = $puppeteer->launch();
        $page = $browser->newPage();
        $page->goto($request->url);
        $data['title'] = $page->title(); 
        $metaDescription = $page->querySelector("head > meta[name*='description']");
        if ($metaDescription) $data['description'] = $metaDescription->getProperty('content')->jsonValue();
        $favicon = $page->querySelector("link[rel*='icon']");
        if ($favicon) $data['favicon'] = $favicon->getProperty('href')->jsonValue();
        $browser->close();

        return response()->json($data);
    }
}
