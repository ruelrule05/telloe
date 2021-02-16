<?php

namespace App\Http\Middleware;

use Closure;

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
        $route = $request->route();
        $routeName = $route ? $route->getName() : '';
        $inRoute = in_array($routeName, $widgetRouteNames);

        if ($request->isMethod('OPTIONS') || $inRoute) {
            $next->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Headers', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST');
        }

        return $next;
    }
}
