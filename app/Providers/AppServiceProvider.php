<?php

namespace App\Providers;

use App\Services\RequestHelper;
use App\Services\ResponseHelper;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('helper.response',function($app){
            return new ResponseHelper();
        });

        $this->app->bind('helper.request',function($app){
            return new RequestHelper();
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
