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
        'namespace' => '\Modules\Frontend\Http\Controllers'
    ],
    function () {
        Route::get('/', 'PageController@homepage');
        Route::get('/@{username}', 'UserController@profile');
		Route::get('/conversations/{conversation_id}/call', 'ConversationController@call')->middleware('auth');

        // AJAX
        Route::group([
            'prefix' => 'ajax',
            'middleware' => 'ajax'
        ], function() {

            Route::group([
                'middleware' => 'auth'
            ], function() {
                
            // Resource
            Route::apiResource('conversations', 'ConversationController')->except(['destroy']);
            Route::apiResource('messages', 'MessageController')->only(['show', 'store', 'update']);
            Route::apiResource('services', 'ServiceController');
            Route::apiResource('notes', 'NoteController');
            Route::apiResource('bookings', 'BookingController');
            Route::apiResource('user_blacklisted_services', 'UserBlacklistedServicesController');
            Route::apiResource('user_customers', 'UserCustomerController');
            Route::apiResource('user_custom_fields', 'UserCustomFieldController')->only(['index', 'store']);
            Route::apiResource('users', 'UserController')->only('index');

            Route::get('tags/search', 'DashboardController@searchTags');
        });

            // Profile page
            Route::get('@{username}', 'UserController@profile');
            Route::get('@{username}/{service_id}/timeslots', 'UserController@serviceTimeslots');
            Route::post('@{username}/{service_id}/book', 'UserController@book');

            //Dashboard
            Route::group([
                'prefix' => 'dashboard',
                'middleware' => 'auth'
            ], function() {
                Route::resource('conversation_members', 'ConversationMemberController');
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
            });
        });
        
        // Dashboard wildcard
        Route::get('/dashboard{any}', function () {
            return view('frontend::layouts.dashboard');
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



