<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\Models\Widget;
use App\Models\WidgetRule;
use Facebook\Facebook;

class WidgetController extends Controller
{
    //
    public function showPublic($slug, Request $request)
    {	
    	$widget = Widget::where('slug', $slug)->firstOrfail();
    	return 'dsds';
    }

    public function show(Request $request)
    {	
		$widget = Auth::user()->widget->load('widgetRules');
	    return response()->json($widget);
    }

    public function addRule(Request $request)
    {
    	$this->validate($request, [
    		'page' => 'required',
    		'state' => 'required|in:minimized,open,hidden',
    	]);

    	$widget = Auth::user()->widget->load('widgetRules');
    	$exists = $widget->widgetRules()->where('page', $request->page)->first();
    	if ($exists) return abort(422, 'Rule already exists for the specified page');

    	$widgetdgetRule = WidgetRule::create([
    		'widget_id' => $widget->id,
    		'page' => $request->page,
    		'state' => $request->state,
    	]);
        return response()->json($widgetdgetRule);
    }

    public function deleteRule($id, Request $request)
    {
    	$widgetRule = WidgetRule::findOrFail($id);
    	if ($widgetRule->widget->user_id != Auth::user()->id) return abort(403, 'You are not authorized to delete this rule');

    	$widgetRule->delete();
        return response()->json(['success' => true]);
    }


    public function facebookPageTab(Request $request)
    {
        if ($request->signed_request) :
            $parsedRequest = $this->parseSignedRequest($request->signed_request);
            $pageID = $parsedRequest['page']['id'];

            $widget = Widget::where('fb_page_id', $pageID)->first();
            if ($widget):
                echo 'This page is registered to Snapturebox.';
            else :
                echo 'This page is NOT registered to Snapturebox.';
            endif;
        endif;
    }

    public function parseSignedRequest($signed_request) 
    {
        list($encoded_sig, $payload) = explode('.', $signed_request, 2); 
        $secret = config('app.fb_app_secret'); // Use your app secret here

        // decode the data
        $sig = $this->base64UrlDecode($encoded_sig);
        $data = json_decode($this->base64UrlDecode($payload), true);

        // confirm the signature
        $expected_sig = hash_hmac('sha256', $payload, $secret, $raw = true);
        if ($sig !== $expected_sig) {
            error_log('Bad Signed JSON signature!');
            return null;
        }

        return $data;
    }

    public function base64UrlDecode($input) 
    {
        return base64_decode(strtr($input, '-_', '+/'));
    }


    public function updateIntegration(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'id' => 'required',
            'access_token' => 'required',
        ]);

        $fb_app_id = config('app.fb_app_id');
        $fb_app_secret = config('app.fb_app_secret');

        $fb = new Facebook([
            'app_id' => $fb_app_id,
            'app_secret' => $fb_app_secret,
            'graph_api_version' => 'v5.0',
        ]);

        try {
            $response = $fb->post(
                '/1360249617370288/tabs',
                [
                    'app_id' => $fb_app_id
                ],
                $request->access_token
            );
        } catch(FacebookExceptionsFacebookResponseException $e) {
          return abort(403, 'Graph returned an error: ' . $e->getMessage());
        } catch(FacebookExceptionsFacebookSDKException $e) {
          return abort(403, 'Facebook SDK returned an error: ' . $e->getMessage());
        }
        $graphNode = $response->getGraphNode();

        Auth::user()->widget->update([
            'fb_page_id' => $request->id
        ]);

        return response()->json($graphNode);
    }


}
