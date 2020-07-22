<?php

namespace Modules\Frontend\Http\Middleware;

use Closure;
use Illuminate\Support\Str;

class ApiCors
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
        $next = $next($request);
        if ($request->getSchemeAndHttpHost() == config('app.api_url')) :
            $next->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Headers', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        endif;
        
        return $next;
    }
}
