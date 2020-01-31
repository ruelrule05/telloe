<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\Models\Widget;
use App\Models\WidgetRule;
use App\Models\Plan;
use App\Models\Subscription;
use Facebook\Facebook;
use Storage;
use Image;
use DB;
use App\Http\StripeAPI;

class WidgetController extends Controller
{
    //
    public function showPublic($slug, Request $request)
    {	
    	$widget = Widget::where('slug', $slug)->firstOrfail();
    	return view('frontend.widget-fullpage', compact('widget'));
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

            $widget = Widget::where('fb_page->id', $pageID)->first();
            if ($widget):
                return view('frontend.widget-fullpage', compact('widget'));
            endif;
        endif;

        return abort(404);
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
        $method = $request->method();
        $fb_app_id = config('app.fb_app_id');
        $fb_app_secret = config('app.fb_app_secret');

        $fb = new Facebook([
            'app_id' => $fb_app_id,
            'app_secret' => $fb_app_secret,
            'graph_api_version' => 'v5.0',
        ]);

        if ($method == 'POST') :
            $this->validate($request, [
                'name' => 'required',
                'id' => 'required',
                'access_token' => 'required',
                'picture' => 'required',
            ]);

            try {
                $response = $fb->post(
                    '/' . $request->id . '/tabs',
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
            $response = $response->getGraphNode();

            $fbPagePicture = 'storage/fb-page-pictures/' . $request->id . '.png';
            Image::make($request->picture['data']['url'])->save($fbPagePicture);
            $widget = Auth::user()->widget;
            $widget->update([
                'fb_page' => [
                    'id' => $request->id,
                    'name' => $request->name,
                    'picture' => '/' . $fbPagePicture,
                ]
            ]);

            $response = $widget->fb_page;

        elseif ($method == 'DELETE') :
            $this->validate($request, [
                'access_token' => 'required',
            ]);
            try {
                $response = $fb->delete(
                    '/1360249617370288/tabs',
                    [
                        'tab' => 'app_' . $fb_app_id
                    ],
                    $request->access_token
                );
            } catch(FacebookExceptionsFacebookResponseException $e) {
              return abort(403, 'Graph returned an error: ' . $e->getMessage());
            } catch(FacebookExceptionsFacebookSDKException $e) {
              return abort(403, 'Facebook SDK returned an error: ' . $e->getMessage());
            }
            $response = ['success' => true];
            $widget = Auth::user()->widget;
            $widget->update([
                'fb_page' => NULL
            ]);
            $response = $widget->fb_page;
        endif;


        return response()->json($response);
    }

    public function customerInformation($slug) {
        $widget = Widget::where('slug', $slug)->firstOrfail();
        return view('frontend.customer-information', compact('widget'));
    }

    public function plans() {
        $plans = Plan::where('stripe_plan_id', '<>', '')->orderBy('price', 'ASC')->get();
        return response()->json($plans);
    }

    public function subscribe(Request $request)
    {
        $this->validate($request, [
            'plan_id' => 'required|exists:plans,id',
            'card_token' => 'required',
        ]);

        $user = Auth::user();
        if (!$user->subscription) :
            $plan = Plan::findOrFail($request->plan_id);
            if (!$plan->stripe_plan_id) return abort(403, 'This plan has no associated Stripe Plan ID');

            $stripe_api = new StripeAPI();

            // Create Stripe Customer ID if not set
            if (!$user->stripe_customer_id) :
                $customer = $stripe_api->customer('create', [ 'email' => $user->email ]);
                $user->update([
                    'stripe_customer_id' => $customer->id
                ]);
            endif;

            // Add Card to Stripe
            $data = [ 
                'stripe_customer_id' => $user->stripe_customer_id,
                'card_token' => $request->card_token
            ];
            $stripe_card = $stripe_api->card('create', $data);
            $data = [ 
                'stripe_customer_id' => $user->stripe_customer_id,
                'plan_id' => $plan->stripe_plan_id,
            ];
            $stripe_subscription = $stripe_api->subscription('create', $data);
            $subscription = Subscription::create([
                'user_id' => $user->id,
                'stripe_subscription_id' => $stripe_subscription->id,
                'plan_id' => $plan->id,
                'status' => 'active'
            ]);

            return response()->json($subscription);
        endif;

        return abort(403, 'You are already subscribed to a plan.');
    }

    public function stripePublishableKey() {
        $stripePublishableKey = config('stripe.publishable_key');
        return response($stripePublishableKey);
    }
}
