<?php
// Authentication
Route::group([
    'domain' => config('app.url'),
    'prefix' => 'ajax',
    'middleware' => 'ajax'
], function () {
    Route::get('auth', 'AuthController@get');
    Route::post('auth', 'AuthController@update');
    Route::put('auth', 'AuthController@update');
    Route::put('auth/password', 'AuthController@updatePassword');
    Route::post('fb_notify', 'InquiryController@messengerNotify');
    Route::put('auth/update_stripe_account', 'AuthController@updateStripeAccount');
    Route::group([
        'middleware' => 'guest'
    ], function () {
        Route::post('login', 'AuthController@login');
        Route::post('login/facebook', 'AuthController@loginFacebook');
        Route::post('login/google', 'AuthController@loginGoogle');
        Route::post('signup', 'AuthController@signup');
        Route::post('recover', 'AuthController@recover');
        Route::post('reset', 'AuthController@reset');
    });
});

Route::post('logout', 'AuthController@logout')->middleware('auth');

Route::get('laravel.log', function () {
    echo '<pre>';
    echo file_get_contents('../storage/logs/laravel.log');
});

