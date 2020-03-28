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
		'domain' => config('app.api_url'),
		'namespace' => 'API' 
], function(){
	Route::get('js/widget.js', 'WidgetController@script');
	Route::get('media/{media}', 'WidgetController@getMedia')->where('media', '(.*)');
	Route::group([
		'middleware' => ['api', 'ajax', 'widget'],
 		'prefix' => 'ajax',
	], function(){

		Route::get('show', 'WidgetController@show');
		Route::get('inquiry_types', 'WidgetController@inquiryTypes');
		Route::resource('inquiries', 'InquiryController')->middleware('auth:api');
		Route::resource('bookings', 'BookingController')->middleware('auth:api');
		Route::resource('messages', 'MessageController')->middleware('auth:api');
		Route::get('get_ig_images', 'WidgetController@getIGImages');
		Route::get('get_page_preview', 'MessageController@getPagePreview');
		Route::match(['GET', 'POST'],'botman', 'MessageController@botman')->middleware('auth:api');
		

		// Authentication
		Route::group(['prefix' => 'auth'], function() {
			Route::post('login', 'AuthController@login');
			Route::post('signup', 'AuthController@signup');
			Route::post('refresh', 'AuthController@refresh');
			Route::get('me', 'AuthController@me')->middleware('auth:api');
			Route::post('logout', 'AuthController@logout')->middleware('auth:api');
		});

	});
});

