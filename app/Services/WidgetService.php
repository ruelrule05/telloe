<?php

namespace App\Services;

use App\Http\Requests\WidgetAddRuleRequest;
use App\Http\Requests\WidgetUpdateIntegrationRequest;
use App\Models\Widget;
use App\Models\WidgetRule;
use Auth;
use Illuminate\Http\Request;

class WidgetService
{
    public static function showPublic($slug, Request $request)
    {
        $widget = Widget::where('slug', $slug)->firstOrfail();
        return view('frontend.widget-fullpage', compact('widget'));
    }

    public static function index()
    {
        return ;
    }

    public static function show()
    {
        $widget = Auth::user()->widget->load('widgetRules');
        return $widget;
    }

    public static function addRule(WidgetAddRuleRequest $request)
    {
        $widget = Auth::user()->widget->load('widgetRules');
        $exists = $widget->widgetRules()->where('page', $request->page)->first();
        if ($exists) {
            return abort(422, 'Rule already exists for the specified page');
        }

        $widgetdgetRule = WidgetRule::create([
            'widget_id' => $widget->id,
            'page' => $request->page,
            'state' => $request->state,
        ]);
        return $widgetdgetRule;
    }

    public static function deleteRule($id, Request $request)
    {
        $widgetRule = WidgetRule::findOrFail($id);
        if ($widgetRule->widget->user_id != Auth::user()->id) {
            return abort(403, 'You are not authorized to delete this rule');
        }

        $widgetRule->delete();
        return ['success' => true];
    }

    public static function facebookPageTab(Request $request)
    {
        if ($request->signed_request) {
            $parsedRequest = self::parseSignedRequest($request->signed_request);
            $pageID = $parsedRequest['page']['id'];

            $widget = Widget::where('fb_page->id', $pageID)->first();
            if ($widget) {
                return view('frontend.widget-fullpage', compact('widget'));
            }
        }

        return abort(404);
    }

    public static function updateIntegration(WidgetUpdateIntegrationRequest $request)
    {
        $method = $request->method();
        $fb_app_id = config('app.fb_app_id');
        $fb_app_secret = config('app.fb_app_secret');
        $response = null;

        $fb = new Facebook([
            'app_id' => $fb_app_id,
            'app_secret' => $fb_app_secret,
            'graph_api_version' => 'v5.0',
        ]);

        if ($method == 'POST') {
            try {
                $response = $fb->post(
                    '/' . $request->id . '/tabs',
                    [
                        'app_id' => $fb_app_id
                    ],
                    $request->access_token
                );
            } catch (FacebookExceptionsFacebookResponseException $e) {
                return abort(403, 'Graph returned an error: ' . $e->getMessage());
            } catch (FacebookExceptionsFacebookSDKException $e) {
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
        } elseif ($method == 'DELETE') {
            try {
                $response = $fb->delete(
                    '/1360249617370288/tabs',
                    [
                        'tab' => 'app_' . $fb_app_id
                    ],
                    $request->access_token
                );
            } catch (FacebookExceptionsFacebookResponseException $e) {
                return abort(403, 'Graph returned an error: ' . $e->getMessage());
            } catch (FacebookExceptionsFacebookSDKException $e) {
                return abort(403, 'Facebook SDK returned an error: ' . $e->getMessage());
            }
            $response = ['success' => true];
            $widget = Auth::user()->widget;
            $widget->update([
                'fb_page' => null
            ]);
            $response = $widget->fb_page;
        }

        return $response;
    }

    public static function parseSignedRequest($signed_request)
    {
        list($encoded_sig, $payload) = explode('.', $signed_request, 2);
        $secret = config('app.fb_app_secret'); // Use your app secret here

        // decode the data
        $sig = self::base64UrlDecode($encoded_sig);
        $data = json_decode(self::base64UrlDecode($payload), true);

        // confirm the signature
        $expected_sig = hash_hmac('sha256', $payload, $secret, $raw = true);
        if ($sig !== $expected_sig) {
            error_log('Bad Signed JSON signature!');
            return null;
        }

        return $data;
    }

    public static function base64UrlDecode($input)
    {
        return base64_decode(strtr($input, '-_', '+/'));
    }

    public static function customerInformation($slug)
    {
        $widget = Widget::where('slug', $slug)->firstOrfail();
        return view('frontend.customer-information', compact('widget'));
    }

    public static function plans()
    {
        $plans = Plan::where('stripe_plan_id', '<>', '')->orderBy('price', 'ASC')->get();
        return $plans;
    }

    public static function store(Request $request)
    {
        return ;
    }

    public static function update(Request $request)
    {
        /*$this->validate($request, [
            'heading' => 'nullable',
            'domain' => 'nullable',
            'slug' => 'nullable',
            'fb_page' => 'nullable',
            'colors' => 'nullable',
            'notify_messenger' => 'nullable',
            'notify_sms' => 'nullable',
            'business_hours' => 'nullable',
        ]);*/
        if ($request->business_hours) {
            $request->merge(['business_hours' => replace_null_with_empty_string($request->business_hours)]);
        }
        $slugExists = Widget::where('slug', $request->slug)->where('id', '<>', Auth::user()->widget->id)->first();
        if ($slugExists) {
            return abort(403, 'Slug already exists.');
        }

        $widget = Auth::user()->widget;
        $widget->update($request->all());

        return $widget->load('widgetRules');
    }

    public static function delete($id)
    {
        return ;
    }
}
