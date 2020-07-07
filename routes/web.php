<?php

// Authentication
Route::group([
    'prefix' => 'ajax',
    'middleware' => 'ajax'
], function() {
    Route::get('auth', 'AuthController@get');
    Route::post('auth', 'AuthController@update');
    Route::put('auth', 'AuthController@update');
    Route::put('auth/password', 'AuthController@updatePassword');
    Route::post('login', 'AuthController@login')->middleware('guest');
    Route::post('login/facebook', 'AuthController@loginFacebook')->middleware('guest');
    Route::post('login/google', 'AuthController@loginGoogle')->middleware('guest');
    Route::post('signup', 'AuthController@signup')->middleware('guest');
    Route::post('recover', 'AuthController@recover')->middleware('guest');
    Route::post('reset', 'AuthController@reset')->middleware('guest');
    Route::post('fb_notify', 'InquiryController@messengerNotify');
    Route::put('auth/update_stripe_account', 'AuthController@updateStripeAccount');
});

Route::post('logout', 'AuthController@logout')->middleware('auth');
Route::get('reset', 'AuthController@reset')->middleware('guest');