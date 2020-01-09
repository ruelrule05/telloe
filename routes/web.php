<?php

$front = 'boxbi.app';
$front = 'snapturebox.com';


/*
 * Frontend Routes
 *
 *
 */

Route::group(
    [
        'domain' => $front,
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
		Route::resource('messages', 'MessageController');
		Route::resource('inquiries', 'InquiryController');
        
       /* Route::get('/{any}', function () {
            return view('frontend.slek');
        })->where('any', '.*');*/
    }
);




