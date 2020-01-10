<?php

use Illuminate\Http\Request;

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

Route::group([
		'middleware' => 'api',
		'domain' => config('app.api_url'),
		'namespace' => 'API' 
], function(){
	Route::get('show', 'WidgetController@show');

	Route::group(['prefix' => 'auth'], function() {
		Route::post('login', 'AuthController@login');
		Route::post('refresh', 'AuthController@refresh');
		Route::get('me', 'AuthController@me')->middleware('auth:api');
		Route::post('logout', 'AuthController@logout')->middleware('auth:api');
	});
});

