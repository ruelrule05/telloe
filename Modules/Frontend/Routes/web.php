<?php
/*
 * Frontend Routes
 *
 *
 */
Route::get('email', function() {
    $email = new Modules\Frontend\Mail\SendInvitation(App\Models\UserCustomer::first(), 'login');
    \Mail::to('clydewinux@gmail.com')->queue($email);
    return $email;
});

Route::get('events', function() {
    echo '<pre>';
    $service = App\Models\Service::find(23);
    $timeslots = $service->timeslots('2020-06-30');

    print_r($timeslots);
});

//Route::get('/msoutlook', '\Modules\Frontend\Http\Controllers\BookingController@outlookCalendarEvents');
//Route::get('/msoutlook', '\Modules\Frontend\Http\Controllers\BookingController@updateOutlookCalendarEvents');


Route::group(
    [
        'domain' => config('app.url'),
        'namespace' => '\Modules\Frontend\Http\Controllers'
    ],
    function () {
        Route::get('/', 'PageController@homepage');
        Route::get('/@{username}', 'UserController@profile');
		Route::get('/conversations/{conversation_id}/call', 'ConversationController@call')->middleware('auth');
        Route::get('/callback/googlecalendar', 'BookingController@googleCalendarCallback')->middleware('auth')->name('googlecalendarcallback');
        Route::get('/callback/msoutlook', 'BookingController@msOutlookCallback')->middleware('auth')->name('msoutlookcallback');
        
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
            Route::apiResource('plans', 'PlanController')->only('index');

            Route::get('tags/search', 'DashboardController@searchTags');

            // Google calendar
            Route::get('google_client', 'BookingController@googleClient');
            Route::get('google_calendar_list', 'BookingController@googleCalendarList');
            Route::get('google_calendar_events', 'BookingController@googleCalendarEvents');
            Route::post('update_google_calendar_events', 'BookingController@updateGoogleCalendarEvents');

            // Outlook calendar
            Route::get('outlook_client', 'BookingController@outlookClient');
            Route::get('outlook_calendar_list', 'BookingController@outlookCalendarList');
            Route::get('outlook_calendar_events', 'BookingController@outlookCalendarEvents');
            Route::post('update_outlook_calendar_events', 'BookingController@updateOutlookCalendarEvents');


            Route::post('remove_calendar', 'BookingController@removeCalendar');
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






