<?php

$front = 'boxbi.app';



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
        
        Route::get('/{any}', function () {
            return view('frontend.slek');
        })->where('any', '.*');
    }
);


