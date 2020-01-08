<?php

$front = 'boxbi.app';
$front = 'snapturebox.com';


/*
 * Frontend Routes
 *
 *
 */

Route::resource('messages', 'MessageController');

Route::group(
    [
        'domain' => $front,
        'namespace' => 'Frontend'
    ],
    function () {
        
        Route::get('/{any}', function () {
            return view('frontend.slek');
        })->where('any', '.*');
    }
);




