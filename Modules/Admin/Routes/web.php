<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(
    [
        'domain' => config('app.admin_url'),
        'namespace' => '\Modules\Admin\Http\Controllers'
    ],
    function () {
        Route::group(
            [
                'middleware' => 'admin'
            ],
            function () {
                Route::group(
                    [
                        'prefix' => 'ajax',
                        'middleware' => 'ajax'
                    ],
                    function() {
                        Route::apiResource('users', 'UserController');
                    }
                );
                
                Route::get('{any}', function () {
                    return view('admin::layout');
                })->where('any', '.*');
            }
        );

        // Authentication
        Route::post('/admin/auth/login', 'AuthController@store');
    }
);