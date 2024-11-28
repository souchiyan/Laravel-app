<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        if ($this->app->environment('local')) {
            // ER図生成用のProviderはcomposer の require-devでインストールしているので、localでのみ使用
            $this->app->register(\BeyondCode\ErdGenerator\ErdGeneratorServiceProvider::class);
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        if (config('app.env') === "production") {
            \URL::forceScheme('https');
        }
    }
    

}
