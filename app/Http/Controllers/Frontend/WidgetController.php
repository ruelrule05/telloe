<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\Models\Widget;
use App\Models\WidgetRule;

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
            print_r($this->parse_signed_request($request->signed_request));
        endif;
    }

    public function parse_signed_request($signed_request) 
    {
        list($encoded_sig, $payload) = explode('.', $signed_request, 2); 
        $secret = config('app.fb_app_secret'); // Use your app secret here

        // decode the data
        $sig = $this->base64_url_decode($encoded_sig);
        $data = json_decode($this->base64_url_decode($payload), true);

        // confirm the signature
        $expected_sig = hash_hmac('sha256', $payload, $secret, $raw = true);
        if ($sig !== $expected_sig) {
            error_log('Bad Signed JSON signature!');
            return null;
        }

        return $data;
    }

    public function base64_url_decode($input) 
    {
        return base64_decode(strtr($input, '-_', '+/'));
    }

}
