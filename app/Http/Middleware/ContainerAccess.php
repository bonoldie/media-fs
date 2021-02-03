<?php

namespace App\Http\Middleware;

use App\Models\Access;
use Closure;
use Illuminate\Http\Request;

class ContainerAccess
{
    /**
     * Validate container access
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if(empty($request->headers->get('access-token'))){
            return app('helper.response')->fail('No access token provided.',403);    
        }else{
            $access_token = $request->headers->get('access-token');
            
            $access = Access::where('token','like',$access_token)->first();
            
            if(empty($access)){
                return app('helper.response')->fail('Invalid token.',403);    
            }

            auth()->access = $access;
        }

        return $next($request);
    }
}
