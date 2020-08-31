<?php
/*
 * Frontend Routes
 *
 *
 */

Route::get('test', function() {
    // $nexmo = new \App\Http\NexmoClient;
    // $nexmo->sms('09162792651', 'You an upcoming booking in less than 2 hours');
});


Route::get('widget', function() {
    return view('frontend::widget', ['profile' => App\Models\User::find(3)]);
});


Route::get('phpinfo', function() {
    return phpinfo();
});



Route::get('email', function() {
    /*$now = \Carbon\Carbon::now();
    $bookings = App\Models\Booking::where('date', '>=', $now->format('Y-m-d'))->get();
    foreach($bookings as $booking) :
        $diffInMinutes = $now->diffInMinutes(\Carbon\Carbon::parse($booking->date . ' ' . $booking->start), false);
        if($diffInMinutes <= 120 && !$booking->notified_2) : // 2 hours notif
            echo 'notify 2 hours';
        elseif ($diffInMinutes <= 1440 && !$booking->notified_24 && $diffInMinutes > 120) : // 24 hours notif
            echo 'notify 24 hours'.'<br />';
        endif;
    endforeach;*/

    
    $user = App\Models\User::where('email', 'cleidoscope@gmail.com')->first();
    $booking = App\Models\Booking::find(112);
    $email = new Modules\Frontend\Mail\NewMessage(App\Models\Message::findOrFail(615));
    //\Mail::send($email);
    return $email;
});

Route::get('events', function() {
    /*echo '<pre>';
    $service = App\Models\Service::find(23);
    $timeslots = $service->timeslots('2020-06-30');

    print_r($timeslots);*/
    $date = \Carbon\Carbon::now();
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

        Route::get('/js/widget.js', 'UserController@widget');
        Route::get('/privacy-policy', 'PageController@privacyPolicy');
        Route::get('/terms-of-service', 'PageController@termsOfService');
        Route::get('/@{username}', 'UserController@profile');
        Route::get('/@{username}/{service_id}', 'UserController@showService');
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
            Route::apiResource('messages', 'MessageController')->only(['show', 'store', 'update', 'destroy']);
            Route::apiResource('services', 'ServiceController');
            Route::apiResource('notes', 'NoteController');
            Route::apiResource('bookings', 'BookingController');
            Route::apiResource('user_blacklisted_services', 'UserBlacklistedServicesController');
            Route::apiResource('contacts', 'ContactController');
            Route::apiResource('user_custom_fields', 'UserCustomFieldController')->only(['index', 'store']);
            Route::apiResource('users', 'UserController')->only('index');
            Route::apiResource('plans', 'PlanController')->only('index');
            Route::apiResource('pending_subscriptions', 'PendingSubscriptionController')->only(['index', 'store', 'destroy']);
            Route::apiResource('pending_invoices', 'PendingInvoiceController')->only(['index', 'store', 'destroy']);

            Route::apiResource('notifications', 'NotificationController')->only(['index', 'show', 'update']);
            Route::post('notifications/clear', 'NotificationController@clear');

            Route::post('contacts/{id}/create_invoice', 'ContactController@createInvoice');
            Route::post('contacts/{id}/finalize_invoice', 'ContactController@finalizeInvoice');
            Route::post('contacts/{id}/create_subscription', 'ContactController@createSubscription');
            Route::post('contacts/{id}/cancel_subscription', 'ContactController@cancelSubscription');
            Route::post('contacts/get_contact_from_invite_token', 'ContactController@getContactFromInviteToken');

            Route::post('convert_video', 'MessageController@convertVideo');
            

            Route::get('tags/search', 'DashboardController@searchTags');
            Route::get('conversations/{id}/files', 'ConversationController@files');

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
            Route::post('@{username}/{service_id}/login_and_book', 'UserController@loginAndBook');
            Route::post('@{username}/{service_id}/signup_and_book', 'UserController@signupAndBook');
            Route::post('@{username}/{service_id}/google_login_and_book', 'UserController@googleLoginAndBook');
            Route::post('@{username}/{service_id}/facebook_login_and_book', 'UserController@facebookLoginAndBook');


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






