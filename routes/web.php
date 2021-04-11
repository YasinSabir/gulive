<?php

Route::group(['prefix' => 'secure'], function () {
    // BOOTSTRAP
    Route::get('bootstrap-data', '\Common\Core\Controllers\BootstrapController@getBootstrapData')->middleware('redirectLink');

    // HOMEPAGE STATS
    Route::get('homepage/stats', 'HomepageStatsController@getStats');

    // LINK
    Route::get('link/reports', 'LinkReportsController@show')->middleware('auth');
    Route::get('link/usage', 'LinkUsageController@getUsage')->middleware('auth');
    Route::apiResource('link', 'LinkController');

    // API KEYS
    Route::apiResource('api-key', 'ApiKeyController');
    Route::get('api-key/usage', 'ApiKeyUsageController@getUsage')->middleware('auth');

    // LINK GROUP
    Route::apiResource('link-group', 'LinkGroupController');
    Route::post('link-group/{linkGroup}/detach', 'LinkGroupAttachmentsController@detach');
    Route::post('link-group/{linkGroup}/attach', 'LinkGroupAttachmentsController@attach');

    // LINK OVERLAY
    Route::apiResource('link-overlay', 'LinkOverlayController');

    // TRACKING PIXEL
    Route::apiResource('tracking-pixel', 'TrackingPixelController');
});

Route::get('{linkHash}/qr', 'QrCodeController@show');
Route::get('{linkHash}/img', 'LinkImageController@show');

//FRONT-END ROUTES THAT NEED TO BE PRE-RENDERED
$homeController = '\Common\Core\Controllers\HomeController@show';
Route::get('/', '\Common\Core\Controllers\HomeController@show')->middleware('prerenderIfCrawler:homepage');

// CATCH ALL ROUTES AND REDIRECT TO HOME
Route::get('{all}', $homeController)
    ->where('all', '.*')
    ->middleware('prerenderIfCrawler:homepage')
    ->middleware('redirectLink');
