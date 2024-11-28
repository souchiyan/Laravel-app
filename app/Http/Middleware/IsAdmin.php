<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class IsAdmin
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
        // 管理者用ルートの場合、セッションを管理者用に切り替える
        if ($request->is('admin/*')) {
            config(['session.cookie' => config('session.admin_cookie')]);

            // 管理者認証をチェック
            if (!Auth::guard('admin')->check()) {
                return redirect('/admin/login')->withErrors('You must be an administrator to access this page.');
            }
        } else {
            // 通常のセッションを使用
            config(['session.cookie' => config('session.cookie')]);

            // ユーザー認証をチェック
            if (!Auth::guard('web')->check()) {
                return redirect('/login')->withErrors('You must be logged in to access this page.');
            }
        }

        return $next($request);
    }
}
