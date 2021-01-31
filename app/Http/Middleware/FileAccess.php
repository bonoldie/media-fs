<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class FileAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (empty($request->has('container_id'))) {
            return app('helper.response')->fail('No container id provided.', 403);
        } else {
            $container_id = $request->get('container_id');
            
            auth()->current_container = auth()->access->containers()->where('id','like',$container_id)->firstOrFail();
        }

        return $next($request);
    }
}
