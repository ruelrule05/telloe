<?php

namespace App\Services;

use App\Http\Controllers\AuthController;
use App\Http\GoogleCalendarClient;
use App\Http\Requests\GuestBookRequest;
use App\Http\Requests\UserBookRequest;
use App\Http\Requests\UserFacebookLoginAndBook;
use App\Http\Requests\UserGoogleLoginRequest;
use App\Http\Requests\UserServiceTimeslotsRequest;
use App\Http\Requests\UserSignupAndBookRequest;
use App\Http\StripeAPI;
use App\Http\Zoom;
use App\Mail\NewBooking;
use App\Mail\Welcome;
use App\Models\Booking;
use App\Models\BookingUser;
use App\Models\Notification;
use App\Models\Service;
use App\Models\User;
use App\Models\Widget;
use Auth;
use Carbon\Carbon;
use File;
use Google_Service_Calendar;
use Google_Service_Calendar_Event;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Mail;
use Response;
use Spatie\CalendarLinks\Link;
use Storage;
use Webpatser\Uuid\Uuid;

class UserService
{
    public static function index(Request $request)
    {
        $users = [];
        $query = $request->get('query');
        $users = User::where('id', '<>', Auth::user()->id);
        if ($query) {
            $users = $users->where('email', 'LIKE', '%' . $query . '%');
        }
        $users = $users->orderByRaw('CONCAT(first_name, last_name)')->get();

        return $users;
    }

    public static function serviceTimeslots($username, $service_id, UserServiceTimeslotsRequest $request)
    {
        $user = User::where('username', $username)->firstOrfail();
        $service = Service::with('user')->where('id', $service_id)->where(function ($query) use ($user) {
            $query->where('user_id', $user->id)->orWhereHas('parentService', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            });
        })->firstOrfail();

        if ($request->single) {
            return response($service->timeslots($request->date));
        }

        $timeslots = [];
        $i = 1;
        $startDate = Carbon::parse($request->date);
        while ($i <= 7) {
            $date = $startDate->format('Y-m-d');
            $dateLabel = $startDate->format('l');
            $timeslots[$dateLabel] = $service->timeslots($date);
            $startDate = $startDate->addDays(1);
            $i++;
        }

        return $timeslots;
    }

    public static function profile($username, $service_id, Request $request)
    {
        $profile = User::where('username', $username)->firstOrfail()->makeHidden(['google_calendar_token', 'outlook_token', 'last_online_format', 'role_id', 'email', 'last_online', 'stripe_customer_id', 'psid']);
        $now = Carbon::now();

        if ($request->ajax() || $request->wantsJson()) {
            if ($request->widget) {
                $service = $profile->services()->where('in_widget', true)->first();
                return response()->json($service);
            }

            $services = $profile->load(['services' => function ($service) use ($now) {
                $service->where('is_available', true)->where(function ($query) use ($now) {
                    $query->where(function ($startsAt) use ($now) {
                        $startsAt->whereNull('starts_at')->orWhereDate('starts_at', '<=', $now);
                    })->where(function ($endsAt) use ($now) {
                        $endsAt->whereNull('ends_at')->orWhereDate('ends_at', '>', $now);
                    });
                });
            }])->services->load(['user', 'assignedServices' => function ($assignedServices) {
                $assignedServices->whereHas('member', function ($member) {
                    $member->where('is_pending', false);
                });
            }]);

            $data = [];
            $data['services'] = $services;

            return response()->json($data);
        }

        $service = null;
        if ($service_id) {
            $service = Service::with(['user', 'assignedServices' => function ($assignedServices) {
                $assignedServices->whereHas('member', function ($member) {
                    $member->where('is_pending', false);
                });
            }])->where('is_available', true)->where('id', $service_id)->where('user_id', $profile->id)->first();
            if (! $service) {
                return abort(403, 'This event type is not available.');
            }
        }

        $timezone = null;
        if (Auth::check() && Auth::user()->id == $profile->id) {
            $timezone = $profile->timezone;
        }

        return view('profile', compact('profile', 'service', 'timezone'));
    }

    public static function showService($username, $service_id)
    {
        $user = User::where('username', $username)->firstOrfail();
        $service = Service::where('id', $service_id)->where('user_id', $user->id)->firstOrfail();
        return view('profile', compact('user'));
    }

    public static function widget(Request $request)
    {
        $profile = User::where('username', $request->p)->firstOrfail()->makeHidden(['google_calendar_token', 'outlook_token', 'last_online_format', 'role_id', 'email', 'last_online', 'stripe_customer_id', 'psid']);
        $profile->profile_image = config('app.url') . $profile->profile_image;
        echo 'const PROFILE = ' . json_encode($profile) . ';';
        echo "const ENDPOINT = '" . config('app.url') . "';";

        $script = File::get(public_path() . '/js/widget/widget.js');
        $response = Response::make($script);
        $response->header('Content-Type', 'text/javascript');
        return $response;
    }

    public static function getInvoice(Request $request)
    {
        if (! $request->invoice_id) {
            return abort(403);
        }

        $stripe_api = new StripeAPI();
        $invoice = $stripe_api->invoice('retrieve', $request->invoice_id, ['stripe_account' => Auth::user()->stripe_account['id']]);

        return $invoice;
    }

    public static function show($id)
    {
        return ;
    }

    public static function store(Request $request)
    {
        return ;
    }

    public static function update($id, Request $request)
    {
        return ;
    }

    public static function delete($id)
    {
        return ;
    }

    public static function book($username, $service_id, $request, $customer, $guest = null)
    {
        if (! isValidTimezone($request->timezone)) {
            return abort(403, 'Invalid timezone');
        }
        $bookings = [];
        $user = User::where('username', $username)->firstOrfail();
        $service = Service::where('id', $service_id)->where(function ($query) use ($user) {
            $query->where(function ($query) use ($user) {
                $query->where('user_id', $user->id)->orWhereHas('member', function ($member) use ($user) {
                    $member->where('member_user_id', $user->id);
                });
            })->orWhereHas('parentService', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            });
        })->firstOrfail();

        if (! $guest && $customer->id == $user->id) {
            return abort(403, 'You are not allowed to book using your own account.');
        }

        $formData = null;

        // parse formData
        if ($service->form_builder) {
            $formData = [];
            $formBuilder = json_decode($service->form_builder, true);
            foreach ($formBuilder as $formField) {
                if (isset($formField['name'])) {
                    $value = $request->formData[$formField['name']] ?? null;
                    if ($value) {
                        switch ($formField['type']) {
                            case 'checkbox-group';
                                $formData[$formField['name']] = [
                                    'label' => $formField['label'],
                                    'value' => implode(', ', $value),
                                    'type' => $formField['type']
                                ];
                                break;

                            case 'date';
                                $formData[$formField['name']] = [
                                    'label' => $formField['label'],
                                    'value' => Carbon::parse($value)->format('Y-m-d'),
                                    'type' => $formField['type']
                                ];
                                break;

                            case 'file';
                                $mime = str_replace('data:', '', explode(';', $value)[0]);
                                $extension = mime2ext($mime);
                                $time = Str::random(15) . '-' . time();
                                $folderName = $time . '-formdata';
                                $filename = Str::random(15) . '.' . $extension;
                                $targetPath = "message-media/$folderName/$filename";
                                $file = base64_decode(substr($value, strpos($value, ',') + 1));
                                Storage::disk('s3')->put($targetPath, $file, 'public');
                                $path = Storage::disk('s3')->url($targetPath);

                                $formData[$formField['name']] = [
                                    'label' => $formField['label'],
                                    'value' => $path,
                                    'type' => $formField['type']
                                ];
                                break;

                            case 'select';
                                $formData[$formField['name']] = [
                                    'label' => $formField['label'],
                                    'value' => $value,
                                    'type' => $formField['type']
                                ];
                                break;

                            case 'text';
                                $formData[$formField['name']] = [
                                    'label' => $formField['label'],
                                    'value' => $value,
                                    'type' => $formField['type']
                                ];
                                break;

                            case 'textarea';
                                $formData[$formField['name']] = [
                                    'label' => $formField['label'],
                                    'value' => $value,
                                    'type' => $formField['type']
                                ];
                                break;

                            case 'radio-group';
                                $formData[$formField['name']] = [
                                    'label' => $formField['label'],
                                    'value' => $value,
                                    'type' => $formField['type']
                                ];
                                break;
                                
                            case 'number';
                                $formData[$formField['name']] = [
                                    'label' => $formField['label'],
                                    'value' => $value,
                                    'type' => $formField['type']
                                ];
                                break;
                        }
                    }
                }
            }
            $formData = json_encode($formData);
        }

        $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        foreach ($request->timeslots as $timeslot) {
            $start = Carbon::parse("{$timeslot['date']['format']} {$timeslot['timeslot']['time']}", $request->timezone);
            $end = $start->copy()->add('minute', $service->duration);

            $zoomLink = null;
            if ($timeslot['type'] == 'Zoom') {
                $types = collect($service->types);
                $type = $types->firstWhere('type', 'Zoom');
                if ($type && $type['data']) {
                    $zoomLink = $type['data'];
                }
            }
            $booking = self::createBooking($service, [
                'service_id' => $service->id,
                'date' => $timeslot['date']['format'],
                'start' => $start->format('H:i'),
                'end' => $end->format('H:i'),
                'meeting_type' => $timeslot['type'],
                'metadata' => ['phone' => $request->phone, 'skype' => $request->skype],
                'form_data' => $formData,
                'timezone' => $request->timezone,
                'zoom_link' => $zoomLink
            ], $customer, $guest, $request);

            if (isset($timeslot['is_recurring']) && isset($timeslot['frequency']) && isset($timeslot['end_date']) && isset($timeslot['days'])) {
                $timeslotDayName = Carbon::parse($timeslot['date']['format'], $request->timezone)->format('l');
                $currentDate = Carbon::parse($timeslot['date']['format'], $request->timezone)->addDay(1);
                $endDate = Carbon::parse($timeslot['end_date'], $request->timezone);
                $weekOfMonth = 0;
                if (isset($timeslot['day_in_month'])) {
                    switch ($timeslot['day_in_month']) {
                    case 'first_week':
                        $weekOfMonth = 1;
                        break;
                    case 'second_week':
                        $weekOfMonth = 2;
                        break;
                    case 'third_week':
                        $weekOfMonth = 3;
                        break;
                    case 'las_week':
                        $weekOfMonth = 4;
                        break;
                }
                }
                while ($currentDate->lessThan($endDate)) {
                    $createBooking = false;
                    if ($timeslot['frequency'] == 'week') {
                        $dayIndex = array_search($currentDate->clone()->format('l'), $days);
                        if (in_array($dayIndex, $timeslot['days'])) {
                            $createBooking = true;
                        }
                    } elseif ($timeslot['frequency'] == 'month' && isset($timeslot['day_in_month'])) {
                        $dayName = $currentDate->clone()->format('l');
                        if ($dayName == $timeslotDayName && $weekOfMonth == $currentDate->clone()->weekOfMonth) {
                            $createBooking = true;
                        }
                    }
                    if ($createBooking) {
                        $recurringBooking = self::createBooking($service, [
                            'service_id' => $service->id,
                            'date' => $currentDate->clone()->format('Y-m-d'),
                            'start' => $start->format('H:i'),
                            'end' => $end->format('H:i'),
                            'meeting_type' => $timeslot['type'],
                            'metadata' => ['phone' => $request->phone, 'skype' => $request->skype],
                            'form_data' => $formData,
                            'timezone' => $request->timezone
                        ], $customer, $guest, $request);
                        if ($recurringBooking) {
                            //$bookings[] = $recurringBooking;
                            $booking->recurring = true;
                            $booking->until = Carbon::parse($recurringBooking->date, $request->timezone)->format('M d, Y');
                            if (! $booking->recurring_days) {
                                $booking->recurring_days = [];
                            }
                            $recurringDays = $booking->recurring_days;
                            $recurringDays[] = Carbon::parse($recurringBooking->date, $request->timezone)->format('l');
                            $booking->recurring_days = $recurringDays;
                        }
                    }
                    $currentDate->addDay(1);
                }
            }

            if ($booking) {
                $bookings[] = $booking;
            }
        }
        if (count($bookings) > 0) {
            Mail::queue(new NewBooking($bookings, 'serviceUser'));
            foreach ($bookings as &$booking) {
                $booking = clone $booking;
                foreach ($booking->bookingUsers as $bookingUser) {
                    $attendeeEmail = $bookingUser->user ? $bookingUser->user->email : (isset($bookingUser->guest['email']) ? $bookingUser->guest['email'] : null);
                    if ($attendeeEmail) {
                        $booking->customName = 'Meeting with ' . $booking->service->coach->full_name;
                        Mail::queue(new NewBooking($bookings, 'customer', $attendeeEmail));
                    }
                }
            }

            $user_id = $bookings[0]->service->user->id ?? null;
            if ($user_id) {
                $fullname = $bookings[0]->user->full_name ?? 'Someone';
                $description = "<strong>{$fullname}</strong> has placed a booking.";
                Notification::create([
                    'user_id' => $user_id,
                    'description' => $description,
                    'link' => ''
                ]);
            }

            if ($bookings[0]->customer) {
                $user_id = $bookings[0]->user->id;
                if ($user_id) {
                    $description = 'A booking has been placed for your account.';
                    Notification::create([
                        'user_id' => $user_id,
                        'description' => $description,
                        'link' => ''
                    ]);
                }
            }
        }
        $bookings = collect($bookings);
        $bookings->map(function ($booking) use ($request) {
            $from = Carbon::parse("$booking->date $booking->start", $request->timezone);
            $to = $from->clone()->addMinute($booking->service->duration);
            $link = Link::create($booking->name, $from, $to)
                ->description($booking->service->description);

            $booking->google_link = $link->google();
            $booking->outlook_link = url('/ics?name=' . $booking->name . '&data=' . $link->ics());
            $booking->yahoo_link = $link->yahoo();
            $booking->ical_link = $booking->outlook_link;
            return $booking;
        });
        return $bookings;
    }

    public static function createBooking($service, $data, $customer, $guest = null, $request)
    {
        $service->load('user');
        $availableTimeslots = $service->timeslots($data['date']);
        $timeslotAvailable = false;
        foreach ($availableTimeslots as $availableTimeslot) {
            if ($availableTimeslot['time'] == $data['start'] && $availableTimeslot['is_available']) {
                $timeslotAvailable = true;
                break;
            }
        }
        // if (! $timeslotAvailable) {
        //     return false;
        // }

        $data['uuid'] = (string) Uuid::generate();
        $name = $service->name;
        if ($guest && isset($guest['first_name']) && isset($guest['last_name'])) {
            $name = $guest['first_name'] . ' ' . $guest['last_name'];
        }
        $data['name'] = $name;
        $booking = Booking::create($data);

        if ($service->create_zoom_link && $service->coach->zoom_token) {
            $zoomLink = Zoom::createMeeting($service->coach, $booking->name, Carbon::parse("$booking->date $booking->start")->toIso8601ZuluString());
            if ($zoomLink) {
                $booking->update([
                    'zoom_link' => $zoomLink['join_url']
                ]);
            }
        }

        $bookingUser = BookingUser::create([
            'booking_id' => $booking->id,
            'user_id' => $customer->id ?? null,
            'guest' => $guest
        ]);

        if (count($request->guests) > 0) {
            foreach ($request->guests as $email) {
                $bookingUser = BookingUser::create([
                    'booking_id' => $booking->id,
                    'user_id' => null,
                    'guest' => ['email' => $email]
                ]);
            }
        }

        if ($service && $service->coach->google_calendar_token && $service->coach->google_calendar_id) {
            $GoogleCalendarClient = new GoogleCalendarClient($service->coach);
            $client = $GoogleCalendarClient->client;
            $googleService = new Google_Service_Calendar($client);
            $attendees = [];
            $attendeeEmail = $bookingUser->user ? $bookingUser->user->email : (isset($bookingUser->guest['email']) ? $bookingUser->guest['email'] : null);
            if ($attendeeEmail) {
                $attendees[] = [
                    'email' => $attendeeEmail
                ];
            }
            $time = time();
            $event = new Google_Service_Calendar_Event([
                'id' => 'telloebooking' . $booking->id . $time,
                'summary' => $data['name'],
                'description' => $booking->service->description,
                'start' => [
                    'dateTime' => Carbon::parse("$booking->date $booking->start")->toIso8601String(),
                    'timeZone' => $booking->service->timezone,
                ],
                'end' => [
                    'dateTime' => Carbon::parse("$booking->date $booking->end")->toIso8601String(),
                    'timeZone' => $booking->service->timezone,
                ],
                'attendees' => $attendees,
                'conferenceData' => [
                    'createRequest' => [
                        'requestId' => time()
                    ]
                ]
            ]);

            try {
                $params = [];
                if ($booking->meeting_type == 'Google Meet') {
                    $params = ['conferenceDataVersion' => 1];
                }
                $event = $googleService->events->insert($service->coach->google_calendar_id, $event, $params);

                if ($booking->meeting_type == 'Google Meet') {
                    $booking->update([
                        'meet_link' => $event->hangoutLink
                    ]);
                }
            } catch (\Exception $e) {
            }
        }

        $from = Carbon::parse("$booking->date $booking->start");
        $to = $from->clone()->addMinute($booking->service->duration);
        $link = Link::create($booking->name, $from, $to)
            ->description($booking->service->description);

        $booking->google_link = $link->google();
        $booking->outlook_link = url('/ics?name=' . $booking->name . '&data=' . $link->ics());
        $booking->yahoo_link = $link->yahoo();
        $booking->ical_link = $booking->outlook_link;
        return $booking->refresh()->load('bookingUsers');
    }

    public static function loginAndBook($username, $service_id, UserBookRequest $request)
    {
        $user = User::where('email', $request->email)->first();
        if (! $user) {
            return abort(403, 'Email does not exists in our records');
        }
        if (! Hash::check($request->password, $user->password)) {
            return abort(403, 'Invalid password');
        }
        if (! $user) {
            return abort(404, 'No user found.');
        }

        return self::book($username, $service_id, $request, $user, true);
    }

    public static function guestBook($username, $service_id, GuestBookRequest $request)
    {
        $service = Service::findOrFail($service_id);
        if ($service->require_payment) {
            if (! $request->card_token) {
                return abort(403, 'Please provide your credit card details.');
            } else {
                $stripe_api = new StripeAPI();
                $charge = $stripe_api->charge('create', [
                    'amount' => $service->default_rate * 100,
                    'currency' => strtolower($service->currency),
                    'source' => $request->card_token
                ]);
            }
        }

        return self::book($username, $service_id, $request, null, $request->only('email', 'first_name', 'last_name', 'timezone'));
    }

    public static function signupAndBook($username, $service_id, UserSignupAndBookRequest $request)
    {
        $exists = User::where('email', $request->email)->first();
        if ($exists) {
            return abort(403, 'Email is already registered to another account.');
        }

        $authController = new AuthController();
        $new_username = $authController->generateUsername($request);
        $user = User::create([
            'username' => $new_username,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'blocked_timeslots' => [],
            'last_online' => null,
            'default_availability' => json_decode('[{"day": "Monday", "is_available": true}, {"day": "Tuesday", "is_available": true}, {"day": "Wednesday", "is_available": true}, {"day": "Thursday", "is_available":true}, {"day": "Friday", "is_available": true}, {"day": "Saturday", "is_available": false}, {"day": "Sunday", "is_available": false}]'),
            'trial_expires_at' => Carbon::now()->add(14, 'day')
        ]);
        $user->password = bcrypt($request->password);
        $user->role_id = 3;
        $user->is_premium = true;
        $user->save();

        if (isValidTimezone($request->timezone)) {
            $user->timezone = $request->timezone;
            $user->save();
        }

        $authController->createDefaultField($user);
        $authController->createInitialConversations($user);
        $authController->createPresetService($user);

        $user = $user->refresh();
        if ($user->role->role == 'client') {
            Mail::queue(new Welcome($user));
        }

        return self::book($username, $service_id, $request, $user);
    }

    public static function googleLoginAndBook($username, $service_id, UserGoogleLoginRequest $request)
    {
        $user = Auth::user();
        return self::book($username, $service_id, $request, $user);
    }

    public static function facebookLoginAndBook($username, $service_id, UserFacebookLoginAndBook $request)
    {
        $user = Auth::user();
        return self::book($username, $service_id, $request, $user);
    }
}
