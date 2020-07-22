<?php
namespace Modules\Admin\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Guard;

class Admin
{
    protected $auth;


    public function __construct(Guard $auth)
    {
        $this->auth = $auth;
    }


    public function handle($request, Closure $next)
    {
        if ($this->auth->guest()) :
            return response( view('admin::auth.login') );
        elseif ($this->auth->user()->role->role != 'administrator') :
            return abort(403);
        endif;

        return $next($request);
    }
}

