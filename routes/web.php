<?php
/*
 * Frontend Routes
 *
 *
 */

Route::get('email', function() {
    $email = new App\Mail\SendInvitation(App\Models\UserCustomer::first(), 'login');
    \Mail::to('clydewinux@gmail.com')->queue($email);
    return $email;
});


Route::group(
    [
        'domain' => config('app.url'),
        'namespace' => 'Frontend'
    ],
    function () {
        Route::get('/', 'PageController@homepage');

        Route::get('/@{username}', 'UserController@profile');
        Route::get('/ajax/@{username}', 'UserController@profile')->middleware('ajax');
        Route::get('/ajax/@{username}/{service_id}/timeslots', 'UserController@serviceTimeslots')->middleware('ajax');
        Route::post('/ajax/@{username}/{service_id}/book', 'UserController@book')->middleware('ajax');
        
		Route::get('login', 'AuthController@login')->middleware('guest');
		Route::get('signup', 'AuthController@signup')->middleware('guest');
        Route::get('recover', 'AuthController@recover')->middleware('guest');
        Route::get('reset', 'AuthController@reset')->middleware('guest');
        Route::post('logout', 'AuthController@logout')->middleware('auth');

        Route::resource('inquiries', 'InquiryController')->middleware('auth');
        Route::resource('widgets', 'WidgetController')->middleware('auth');

		Route::get('conversations/{conversation_id}/call/{action}', 'ConversationController@call')->middleware('auth');

        Route::group([
            'prefix' => 'ajax',
            'middleware' => 'ajax'
        ], function() {
            Route::get('auth', 'AuthController@get');
            Route::put('auth', 'AuthController@update');
            Route::put('auth/password', 'AuthController@updatePassword');
            Route::post('login', 'AuthController@login')->middleware('guest');
            Route::post('login/facebook', 'AuthController@loginFacebook')->middleware('guest');
            Route::post('login/google', 'AuthController@loginGoogle')->middleware('guest');
            Route::post('signup', 'AuthController@signup')->middleware('guest');
            Route::post('recover', 'AuthController@recover')->middleware('guest');
            Route::post('reset', 'AuthController@reset')->middleware('guest');
            Route::post('fb_notify', 'InquiryController@messengerNotify');

            Route::group([
                'prefix' => 'dashboard',
                'middleware' => 'auth'
            ], function() {
                Route::get('', 'AuthController@reports');
                Route::resource('inquiries', 'InquiryController');
                Route::resource('conversations', 'ConversationController');
                Route::resource('messages', 'MessageController');
                Route::resource('notes', 'NoteController');
                Route::resource('bookings', 'BookingController');
                Route::resource('services', 'ServiceController');
                Route::resource('user_customers', 'UserCustomerController');
                Route::resource('conversation_members', 'ConversationMemberController');
                Route::post('inquiries/{id}/message', 'InquiryController@postMessage');
                Route::get('widget', 'WidgetController@show');
                Route::put('widget', 'WidgetController@update');
                Route::post('widget/rule', 'WidgetController@addRule');
                Route::delete('widget/rule/{id}', 'WidgetController@deleteRule');
                Route::any('integration', 'WidgetController@updateIntegration');
                Route::get('plans', 'WidgetController@plans');
                Route::get('stripe_publishable_key', 'WidgetController@stripePublishableKey');
                Route::resource('subscriptions', 'SubscriptionController', [
                    'only' => ['store', 'destroy']
                ]);
                Route::resource('chatbots', 'ChatbotController');
                Route::resource('chatboxes', 'ChatboxController');
                Route::post('upload_file', 'ChatboxController@uploadFile');
                Route::get('users', 'UserController@search');
            });
        });
        
        Route::get('/dashboard{any}', function () {
            return view('frontend.layouts.dashboard');
        })->where('any', '.*')->middleware('auth');

        

        Route::any('/facebook_page_tab', 'WidgetController@facebookPageTab');
        Route::get('/{slug}', 'WidgetController@showPublic');
        Route::get('/{slug}/customer-information', 'WidgetController@customerInformation');

        Route::post('/fb_messenger_webhook', 'AuthController@FBMessengerWebhook');
    }
);


/*
 * Admin Routes
 *
 *
 */
Route::group(
    [
        'domain' => config('app.admin_url'),
        'namespace' => 'Admin'
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
                        Route::resource('areas-of-interests', 'AreasOfInterestController');
                        Route::resource('employers', 'EmployerController');
                        Route::resource('assistants', 'AssistantController');
                        Route::resource('applicants', 'ApplicantController');
                        Route::put('assistants/{id}/verify', 'AssistantController@verify');
                    }
                );
                
                Route::get('{any}', function () {
                    return view('admin.layout');
                })->where('any', '.*');
            }
        );

        // Authentication
        Route::post('/admin/auth/login', 'AuthController@store');
    }
);



