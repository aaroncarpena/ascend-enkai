<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Propietario
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $model = $request->route()->parameter('id');
        if ($request->user()->id != $model->user_id) {
            return response()->json(['error' => 'No autorizado'], 403);
        }
        return $next($request);    }
}
