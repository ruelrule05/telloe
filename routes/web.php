<?php
/*
 * Frontend Routes
 *
 *
 */
use  App\Http\Controllers\AuthController;
use  App\Http\Controllers\BookingController;
use App\Http\Controllers\VideoMessageController;
use  App\Http\SocialiteHelper;

// Route::get('/test', function(){
//     $bookings = [App\Models\Booking::whereNotNull('service_id')->latest()->first()];
//     $email = new App\Mail\NewBooking($bookings, 'serviceUser');
//     return $email;
// });
Route::group(
    [
        'domain' => config('app.url'),
    ],
    function () {
        Route::get('/', 'PageController@homepage')->name('home');
        Route::get('/contact', 'PageController@contact');
        Route::get('/affiliates', 'PageController@affiliates');
        Route::get('/affiliate-terms', 'PageController@affiliateTerms');

        Route::get('/booking-links/{uuid}', 'BookingLinkController@public');
        Route::get('/bookings/{uuid}', 'BookingController@show');

        Route::get('/ics', 'BookingController@downloadIcs');

        Route::get('/js/widget.js', 'UserController@widget');
        Route::get('/privacy-policy', 'PageController@privacyPolicy');
        Route::get('/terms-of-service', 'PageController@termsOfService');
        Route::get('/callback/zoom', 'ZoomController@callback')->middleware('auth');
        Route::get('/callback/googlecalendar', 'GoogleCalendarController@callback')->middleware('auth')->name('googlecalendarcallback');
        Route::get('/callback/msoutlook', 'OutlookController@callback')->middleware('auth');
        Route::get('/callback/xero', 'XeroController@callback')->middleware('auth');

        // AJAX
        Route::group([
            'prefix' => 'ajax',
            'middleware' => 'ajax'
        ], function () {
            // Authentication
            Route::get('auth', 'AuthController@get');
            Route::post('auth', 'AuthController@update');
            Route::put('auth', 'AuthController@update');
            Route::put('auth/password', 'AuthController@updatePassword');
            Route::post('fb_notify', 'InquiryController@messengerNotify');
            Route::put('auth/update_stripe_account', 'AuthController@updateStripeAccount');
            Route::post('auth/guest_account', 'AuthController@createGuestAccount');
            Route::put('booking-links/{uuid}/associate_user', 'BookingLinkController@associateUser')->middleware('auth');

            // Authenticated routes
            Route::group([
                'middleware' => 'auth'
            ], function () {
                // Resource
                Route::apiResource('conversations', 'ConversationController')->except(['destroy']);
                Route::apiResource('messages', 'MessageController')->only(['show', 'store', 'update', 'destroy']);
                Route::get('messages/{id}/generate_link_preview', 'MessageController@generateLinkPreview');
                Route::get('services/contact_services', 'ServiceController@contactServices');
                Route::apiResource('services', 'ServiceController');
                Route::apiResource('notes', 'NoteController');
                Route::get('bookings/upcoming', [BookingController::class, 'upcoming']);
                Route::get('bookings/contact', [BookingController::class, 'contactBookings']);
                Route::apiResource('bookings', 'BookingController');
                Route::post('bookings/{id}/assign_to_member', 'BookingController@assignToMember');
                Route::apiResource('user_blacklisted_services', 'UserBlacklistedServicesController');
                Route::apiResource('contacts', 'ContactController');
                Route::post('contacts/bulk', 'ContactController@bulkStore');
                Route::get('contacts/{id}/recent_notes', 'ContactController@recentNotes');
                Route::get('contacts/{id}/contact_notes', 'ContactController@contactNotes');
                Route::post('contacts/{id}/resend', 'ContactController@resend');
                Route::post('contacts/{id}/package', 'ContactController@package');
                Route::delete('contacts/{id}/package', 'ContactController@deletePackage');
                Route::put('contacts/{id}/package', 'ContactController@updatePackage');
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
                Route::apiResource('video_messages', 'VideoMessageController');
                Route::put('video_messages/{video_message}/set_status', [VideoMessageController::class, 'setStatus']);
                Route::apiResource('user_videos', 'UserVideoController');
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
                Route::get('google_calendar_list', 'GoogleCalendarController@googleCalendarList');
                Route::get('google_calendar_events', 'GoogleCalendarController@googleCalendarEvents');
                Route::post('update_google_calendar_events', 'BookingController@updateGoogleCalendarEvents');
                Route::get('google_calendar/token', 'GoogleCalendarController@getToken');
                Route::get('google_calendar/remove', 'GoogleCalendarController@remove');
                Route::put('google_calendar', 'GoogleCalendarController@update');

                // Outlook calendar
                Route::get('outlook/client', 'OutlookController@getClient');
                Route::get('outlook_calendar_list', 'OutlookController@outlookCalendarList');
                Route::get('outlook_calendar_events', 'OutlookController@outlookCalendarEvents');
                Route::post('update_outlook_calendar_events', 'OutlookController@updateOutlookCalendarEvents');
                Route::get('outlook/token', 'OutlookController@getToken');
                Route::get('outlook/remove', 'OutlookController@remove');
                Route::put('outlook_calendar', 'OutlookController@update');

                // Xero
                Route::get('xero/authenticate', 'XeroController@authenticate');
                Route::get('xero/tenants', 'XeroController@tenants');
                Route::post('xero/tenants_save', 'XeroController@saveTenant');
                Route::get('xero/invoices', 'XeroController@invoices');
                Route::get('xero/token', 'XeroController@getToken');
                Route::get('xero/remove', 'XeroController@remove');
                Route::post('xero/invoices', 'XeroController@storeInvoice');
                Route::put('xero/invoices', 'XeroController@updateInvoice');

                Route::get('get_invoice', 'UserController@getInvoice');

                Route::get('get_page_preview', 'MessageController@getPagePreview');

                // Zoom
                Route::get('zoom/token', 'ZoomController@getToken')->name('zoomtoken');
                Route::get('zoom/install', 'ZoomController@install')->name('zoominstall');
                Route::get('zoom/remove', 'ZoomController@remove')->name('zoomremove');
                Route::get('zoom/create_meeting', 'ZoomController@createMeeting')->name('zoomcreateMeeting');

                // Xirsys
                Route::get('xirsys/ice', 'XirsysController@getIceServers');
                Route::get('xirsys/token', 'XirsysController@getToken');
                Route::get('xirsys/host', 'XirsysController@gethost');

                Route::get('booking-links/get_all_timeslots', 'BookingLinkController@getAllTimeslots');
                Route::post('booking-links/{id}/send_invitation', 'BookingLinkController@sendInvitation');
                Route::post('booking-links/{uuid}/book', 'BookingLinkController@book');
                Route::post('booking-links/{id}/message', 'BookingLinkController@message');
                Route::apiResource('booking-links', 'BookingLinkController');

                Route::prefix('stripe')->group(function () {
                    Route::get('invoices', 'StripeController@invoices');
                    Route::post('invoices', 'StripeController@storeInvoice');
                    Route::put('invoices/{id}', 'StripeController@updateInvoice');
                    Route::get('subscriptions', 'StripeController@subscriptions');
                    Route::post('subscriptions', 'StripeController@storeSubscription');
                    Route::delete('subscriptions/{id}', 'StripeController@cancelSubscription');
                    Route::get('country_specs', 'StripeController@countrySpecs');
                });
            });

            Route::get('/auth/{driver}/redirect', [SocialiteHelper::class, 'getRedirectUrl'])->middleware('ajax');
            Route::post('login', 'AuthController@login');
            Route::post('signup', 'AuthController@signup');
            Route::post('recover', 'AuthController@recover');
            Route::post('reset', 'AuthController@reset');

            // Booking page
            Route::group([
                'prefix' => '@{username}',
                'name' => 'bookingPage'
            ], function () {
                Route::get('', 'UserController@profile')->name('profile');
                Route::get('/{service_id}/timeslots', 'UserController@serviceTimeslots')->name('profile.service.timeslots');
                Route::post('/{service_id}/book', 'UserController@book')->name('profile.book');
                Route::post('/{service_id}/login_and_book', 'UserController@loginAndBook')->name('profile.login_and_book');
                Route::post('/{service_id}/signup_and_book', 'UserController@signupAndBook')->name('profile.signup_and_book');
                Route::post('/{service_id}/google_login_and_book', 'UserController@googleLoginAndBook')->name('profile.google_login_and_book')->middleware('auth');
                Route::post('/{service_id}/facebook_login_and_book', 'UserController@facebookLoginAndBook')->name('profile.facebook_login_and_book')->middleware('auth');
                Route::post('/{service_id}/guest_book', 'UserController@guestBook')->name('profile.guest_book');
            });

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
                Route::resource('subscriptions', 'SubscriptionController', [
                    'only' => ['store', 'destroy']
                ]);
                // Route::resource('chatbots', 'ChatbotController');
                // Route::resource('chatboxes', 'ChatboxController');
                // Route::post('upload_file', 'ChatboxController@uploadFile');
                Route::get('stripe_invoices', 'DashboardController@stripeInvoices');
            });
        });

        Route::post('logout', 'AuthController@logout')->middleware('auth');
        // Socialite callback
        Route::get('/auth/{driver}/callback', [AuthController::class, 'socialiteCallback']);

        // Dashboard fallback
        Route::group([
            'prefix' => 'dashboard',
            'middleware' => 'auth'
        ], function () {
            Route::fallback(function () {
                return view('layouts.dashboard');
            });
        });

        Route::get('/video-messages/{video_message:uuid}', 'VideoMessageController@show');
        Route::get('/@{username}', 'UserController@profile')->name('bookingPage');
        Route::get('/@{username}/{service_id}', 'UserController@profile')->name('bookingPage');
        Route::get('/{organization}', 'OrganizationController@profile')->name('bookingPage');
        Route::get('conversations/{slug}', 'ConversationController@slug');
        Route::get('/account/setup', 'AuthController@setup')->middleware('auth');
    }
);