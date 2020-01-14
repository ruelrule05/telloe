<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Widget;

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
}
