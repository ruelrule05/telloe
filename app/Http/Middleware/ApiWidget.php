<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Str;
use App\Models\Widget;
use DB;

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
        $authorizedDomain = ($domain == env('AUTHORIZED_DOMAIN'));
        if ($authorizedDomain) :
            $url_parts = array_diff(explode('/', parse_url($request->server('HTTP_REFERER'), PHP_URL_PATH)), ['']);
            $post_name = end($url_parts);
            $domain_name = explode('.', $domain)[0];
            try {
                $post = DB::connection($domain_name)->table('wp_posts')->where('post_name', $post_name)->first();
                if ($post) :
                    $request->wp_post = $post;
                endif;
            } catch (\Exception $e) {}
        endif;

        $widget = Widget::with('widgetRules', 'widgetType')->where('domain', $domain)->first();
        if (!$widget) return abort(401, 'This domain is not registered to Snapturebox.');

        $widget->makeHidden('fb_page');
        $request->widget = $widget;
        $request->domain = $domain;
        
        return $next($request);
    }
}
