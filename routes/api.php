<?php


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->post('links/create', 'LinkController@store');
Route::middleware('apiTokenCheck')->post('/shortlinks', 'LinkController@store_api');

Route::get('/get_users' , 'ApiKeyController@getUser');
