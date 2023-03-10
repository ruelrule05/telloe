<?php

namespace App\Http\Middleware;

use Closure;

class Ajax
{
    public function handle($request, Closure $next)
    {
        if (! $request->ajax() || ! $request->wantsJson()) {
            return abort(403);
        }

        return $next($request);
    }
}