<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Str;
use App\Models\Widget;

class ApiWidget
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {   
        $domain = parse_url($request->server('HTTP_REFERER'), PHP_URL_HOST);
        $widget = Widget::with('widgetRules', 'widgetType')->where('domain', $domain)->first();
        if (!$widget) return abort(401, 'This domain is not registered to Snapturebox.');

        $widget->makeHidden('fb_page');
        $request->widget = $widget;
        $request->domain = $domain;
        
        return $next($request);
    }
}
