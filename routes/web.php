<?php
/*
 * Frontend Routes
 *
 *
 */

Route::group(
    [
        'domain' => config('app.url'),
        'namespace' => 'Frontend'
    ],
    function () {
        Route::get('/', 'PageController@homepage');
		Route::get('login', 'AuthController@login')->middleware('guest');
        Route::post('login', 'AuthController@login')->middleware('guest');
		Route::get('signup', 'AuthController@signup')->middleware('guest');
        Route::post('signup', 'AuthController@signup')->middleware('guest');
        Route::post('logout', 'AuthController@logout')->middleware('auth');
        Route::get('recover', 'AuthController@recover')->middleware('guest');
        Route::post('recover', 'AuthController@recover')->middleware('guest');
        Route::get('reset', 'AuthController@reset')->middleware('guest');
		Route::post('reset', 'AuthController@reset')->middleware('guest');

		Route::resource('messages', 'MessageController')->middleware('auth');
        Route::resource('inquiries', 'InquiryController')->middleware('auth');
		Route::resource('widgets', 'WidgetController')->middleware('auth');

        Route::group([
            'prefix' => 'ajax'
        ], function() {

            Route::group([
                'prefix' => 'dashboard',
                'middleware' => 'auth'
            ], function() {
                Route::get('widget', 'WidgetController@show');
                Route::post('widget/rule', 'WidgetController@addRule');
                Route::delete('widget/rule/{id}', 'WidgetController@deleteRule');
            });
        

        });
        
        Route::get('/dashboard/{any}', function () {
            return view('frontend.layouts.dashboard');
        })->where('any', '.*');

        

        Route::get('/facebook_page_tab', 'WidgetController@facebookPageTab');
        Route::get('/{slug}', 'WidgetController@showPublic');
    }
);




