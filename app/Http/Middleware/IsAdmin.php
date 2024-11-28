<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    // public function handle($request, Closure $next)
    // {
    //     if (Auth::check() && Auth::admin()->is_admin) {
    //         return $next($request);
    //     }
    //     return redirect('/'); // 管理者でない場合
    // }
    public function handle($request, Closure $next)
{
    if ($request->is('admin/*')) {
        config(['session.cookie' => config('session.admin_cookie')]);
    } else {
        config(['session.cookie' => config('session.user_cookie')]);
    }

    return $next($request);
}

}
