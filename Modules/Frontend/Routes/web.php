<?php
/*
 * Frontend Routes
 *
 *
 */

Route::get('test', function () {
});

Route::get('widget', function () {
    return view('frontend::widget', ['profile' => App\Models\User::find(3)]);
});

Route::get('phpinfo', function () {
    return phpinfo();
});

Route::get('email', function () {
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

    //$user = App\Models\User::where('email', 'cleidoscope@gmail.com')->first();
    //$booking = App\Models\Booking::find(40);
    $email = new Modules\Frontend\Mail\NewBooking([App\Models\Booking::first(), App\Models\Booking::find(16)], App\Models\User::first(), 'contact');
    //$email = new Modules\Frontend\Mail\UpcomingBooking(App\Models\Booking::find(170), 'dwada');
    //$email = new Modules\Frontend\Mail\UpdateBooking(App\Models\Booking::first(),'client');
    //\Mail::to('cleidoscope@gmail.com')->send($email);

    return $email;
});

Route::get('events', function () {
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

        Route::get('/ics', 'BookingController@downloadIcs');

        Route::get('/js/widget.js', 'UserController@widget');
        Route::get('/privacy-policy', 'PageController@privacyPolicy');
        Route::get('/terms-of-service', 'PageController@termsOfService');
        Route::get('/@{username}', 'UserController@profile');
        Route::get('/{organization}', 'OrganizationController@profile');
        //Route::get('/@{username}/{service_id}', 'UserController@showService');
        //Route::get('/conversations/{conversation_id}/call', 'ConversationController@call')->middleware('auth');
        Route::get('/callback/zoom', 'ZoomController@callback')->middleware('auth');
        Route::get('/callback/googlecalendar', 'GoogleCalendarController@callback')->middleware('auth')->name('googlecalendarcallback');
        Route::get('/callback/msoutlook', 'OutlookController@callback')->middleware('auth');
        Route::get('/callback/xero', 'XeroController@callback')->middleware('auth');

        // AJAX
        Route::group([
            'prefix' => 'ajax',
            'middleware' => 'ajax'
        ], function () {
            Route::group([
                'middleware' => 'auth'
            ], function () {
                // Resource
                Route::apiResource('conversations', 'ConversationController')->except(['destroy']);
                Route::apiResource('messages', 'MessageController')->only(['show', 'store', 'update', 'destroy']);
                Route::get('messages/{id}/generate_link_preview', 'MessageController@generateLinkPreview');
                Route::apiResource('services', 'ServiceController');
                Route::apiResource('notes', 'NoteController');
                Route::apiResource('bookings', 'BookingController');
                Route::post('bookings/{id}/assign_to_member', 'BookingController@assignToMember');
                Route::apiResource('user_blacklisted_services', 'UserBlacklistedServicesController');
                Route::apiResource('contacts', 'ContactController');
                Route::get('contacts/{id}/recent_notes', 'ContactController@recentNotes');
                Route::get('contacts/{id}/contact_notes', 'ContactController@contactNotes');
                Route::post('contacts/{id}/resend', 'ContactController@resend');
                Route::apiResource('members', 'MemberController');
                Route::post('members/{id}/resend', 'MemberController@resend');
                Route::post('members/{id}/assign_service', 'MemberController@assignService');
                Route::apiResource('user_custom_fields', 'UserCustomFieldController')->only(['index', 'store']);
                Route::apiResource('users', 'UserController')->only('index');
                Route::apiResource('plans', 'PlanController')->only('index');
                Route::apiResource('pending_subscriptions', 'PendingSubscriptionController')->only(['index', 'store', 'destroy']);
                Route::apiResource('pending_invoices', 'PendingInvoiceController')->only(['index', 'store', 'destroy']);
                Route::apiResource('packages', 'PackageController');
                Route::apiResource('organizations', 'OrganizationController');
                Route::delete('organizations/{id}/delete_member', 'OrganizationController@deleteMember');
                Route::post('organizations/{id}/add_members', 'OrganizationController@addMembers');
                Route::apiResource('contact_notes', 'ContactNoteController');

                Route::apiResource('notifications', 'NotificationController')->only(['index', 'show', 'update']);
                Route::post('notifications/clear', 'NotificationController@clear');

                Route::post('contacts/{id}/create_invoice', 'ContactController@createInvoice');
                Route::post('contacts/{id}/finalize_invoice', 'ContactController@finalizeInvoice');
                Route::post('contacts/{id}/create_subscription', 'ContactController@createSubscription');
                Route::post('contacts/{id}/cancel_subscription', 'ContactController@cancelSubscription');
                Route::post('contacts/get_contact_from_invite_token', 'ContactController@getContactFromInviteToken');

                Route::post('members/get_member_from_invite_token', 'MemberController@getMemberFromInviteToken');

                Route::get('tags/search', 'DashboardController@searchTags');
                Route::get('conversations/{id}/files', 'ConversationController@files');

                // Google calendar
                Route::get('google_calendar/client', 'GoogleCalendarController@getClient');
                Route::get('google_calendar_list', 'BookingController@googleCalendarList');
                Route::get('google_calendar_events', 'BookingController@googleCalendarEvents');
                Route::post('update_google_calendar_events', 'BookingController@updateGoogleCalendarEvents');
                Route::get('google_calendar/token', 'GoogleCalendarController@getToken');
                Route::get('google_calendar/remove', 'GoogleCalendarController@remove');

                // Outlook calendar
                Route::get('outlook/client', 'OutlookController@getClient');
                Route::get('outlook_calendar_list', 'BookingController@outlookCalendarList');
                Route::get('outlook_calendar_events', 'BookingController@outlookCalendarEvents');
                Route::post('update_outlook_calendar_events', 'BookingController@updateOutlookCalendarEvents');
                Route::get('outlook/token', 'OutlookController@getToken');
                Route::get('outlook/remove', 'OutlookController@remove');

                // Xero
                Route::get('xero/authenticate', 'XeroController@authenticate');
                Route::get('xero/tenants', 'XeroController@tenants');
                Route::post('xero/tenants_save', 'XeroController@saveTenant');
                Route::get('xero/invoices', 'XeroController@invoices');
                Route::get('xero/token', 'XeroController@getToken');
                Route::get('xero/remove', 'XeroController@remove');
                Route::post('xero/invoices', 'XeroController@storeInvoice');
                Route::put('xero/invoices', 'XeroController@updateInvoice');

                Route::post('remove_calendar', 'BookingController@removeCalendar');
                Route::get('get_invoice', 'UserController@getInvoice');

                Route::get('get_page_preview', 'MessageController@getPagePreview');

                // Zoom
                Route::get('zoom/token', 'ZoomController@getToken')->name('zoomtoken');
                Route::get('zoom/install', 'ZoomController@install')->name('zoominstall');
                Route::get('zoom/remove', 'ZoomController@remove')->name('zoomremove');
                Route::get('zoom/create_meeting', 'ZoomController@createMeeting')->name('zoomcreateMeeting');
            });

            // Booking page
            Route::get('@{username}', 'UserController@profile')->name('profile');
            Route::get('@{username}/{service_id}/timeslots', 'UserController@serviceTimeslots')->name('profile.service.timeslots');
            Route::post('@{username}/{service_id}/book', 'UserController@book')->name('profile.book');
            Route::post('@{username}/{service_id}/login_and_book', 'UserController@loginAndBook')->name('profile.login_and_book');
            Route::post('@{username}/{service_id}/signup_and_book', 'UserController@signupAndBook')->name('profile.signup_and_book');
            Route::post('@{username}/{service_id}/google_login_and_book', 'UserController@googleLoginAndBook')->name('profile.google_login_and_book');
            Route::post('@{username}/{service_id}/facebook_login_and_book', 'UserController@facebookLoginAndBook')->name('profile.facebook_login_and_book');

            // Organization booking page
            Route::get('{organization}', 'OrganizationController@profile');
            Route::get('{organization}/{service_id}/timeslots', 'OrganizationController@serviceTimeslots')->name('organization.service.timeslots');

            //Dashboard
            Route::group([
                'prefix' => 'dashboard',
                'middleware' => 'auth'
            ], function () {
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
