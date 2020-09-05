<?php

namespace Modules\Frontend\Http\Middleware;

use Closure;
use Illuminate\Support\Str;

class WidgetCors
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
        $widgetRouteNames = [
            'profile', 
            'profile.service.timeslots',
            'profile.book',
            'profile.login_and_book',
            'profile.login_and_book',
            'profile.signup_and_book',
            'profile.google_login_and_book',
            'profile.facebook_login_and_book',
        ];
        
        $next = $next($request);
        $routeName = $request->route()->getName();
        $inRoute = in_array($routeName, $widgetRouteNames);

        if ($request->isMethod('OPTIONS') || $inRoute) :
            $next->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Headers', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST');
        endif;
        
        return $next;
    }
}
