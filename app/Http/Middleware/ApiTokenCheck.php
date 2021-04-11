<?php

namespace App\Http\Middleware;

use Closure;

class ApiTokenCheck
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
        $token        = $request->header('API-Token');
        $data         = \App\ApiKey::all();
        $api_tokens   = [];

        if(empty($token)){
            return response()->json(['message' => 'Api token is required!' , 'status' => 422]);
        }

        foreach ($data as $key => $val){
            $api_tokens [] = $val->api_key;
        }

        if(in_array( $token , $api_tokens)){
            return $next($request);
        }else{
            return response()->json(['message' => 'Error api token is not found', 'status' => 422]);
        }

    }
}
