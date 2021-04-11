<?php

namespace App\Providers;

use App\Actions\Admin\GetAnalyticsHeaderData;
use App\Actions\Admin\GetAppAnalyticsData;
use App\Actions\AppBootstrapData;
use App\Actions\AppValueLists;
use Common\Admin\Analytics\Actions\GetAnalyticsData;
use Common\Admin\Analytics\Actions\GetAnalyticsHeaderDataAction;
use Common\Core\Bootstrap\BootstrapData;
use Common\Core\Values\ValueLists;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * @return void
     */
    public function register()
    {
        // TEMP: disable deprecated warnings on php 7.4 until upgrade to laravel 6
        if (version_compare(PHP_VERSION, '7.4.0') >= 0) {
            error_reporting(E_ALL ^ E_DEPRECATED);
        }

        // bind analytics
        $this->app->bind(
            GetAnalyticsHeaderDataAction::class,
            GetAnalyticsHeaderData::class
        );

        $this->app->bind(
            GetAnalyticsData::class,
            GetAppAnalyticsData::class
        );

//        $this->app->bind(
//            AppUrlGenerator::class,
//            UrlGenerator::class
//        );

        $this->app->bind(
            BootstrapData::class,
            AppBootstrapData::class
        );

        $this->app->bind(ValueLists::class, AppValueLists::class);
    }
}
