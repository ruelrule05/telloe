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
use Mail;
use Response;
use Spatie\CalendarLinks\Link;

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
        $service = Service::where('id', $service_id)->where(function ($query) use ($user) {
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
            }])->services->load('user', 'assignedServices.member.memberUser');

            $data = [];
            $data['services'] = $services;

            return response()->json($data);
        }

        $service = null;
        if ($service_id) {
            $service = Service::with('user', 'assignedServices.member.memberUser')->where('is_available', true)->where('id', $service_id)->where('user_id', $profile->id)->firstOrFail();
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

    public static function book($username, $service_id, $request, $customer, $guest = NULL)
    {
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

        $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        foreach ($request->timeslots as $timeslot) {
            $start = Carbon::parse("{$timeslot['date']['format']} {$timeslot['timeslot']['time']}");
            $end = $start->copy()->add('minute', $service->duration);
            $booking = self::createBooking($service, [
                'service_id' => $service->id,
                'date' => $timeslot['date']['format'],
                'start' => $start->format('H:i'),
                'end' => $end->format('H:i'),
                'meeting_type' => $timeslot['type'],
                'metadata' => ['phone' => $request->phone, 'skype' => $request->skype]
            ], $customer, $guest);

            if (isset($timeslot['is_recurring']) && isset($timeslot['frequency']) && isset($timeslot['end_date']) && isset($timeslot['days'])) {
                $timeslotDayName = Carbon::parse($timeslot['date']['format'])->format('l');
                $currentDate = Carbon::now()->addDay(1);
                $endDate = Carbon::parse($timeslot['end_date']);
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
                            'metadata' => ['phone' => $request->phone, 'skype' => $request->skype]
                        ], $customer, $guest);
                        if ($recurringBooking) {
                            //$bookings[] = $recurringBooking;
                            $booking->recurring = true;
                            $booking->until = Carbon::parse($recurringBooking->date)->format('M d, Y');
                            if (! $booking->recurring_days) {
                                $booking->recurring_days = [];
                            }
                            $recurringDays = $booking->recurring_days;
                            $recurringDays[] = Carbon::parse($recurringBooking->date)->format('l');
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
            Mail::queue(new NewBooking($bookings, 'customer'));

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

        return $bookings;
    }

    public static function createBooking($service, $data, $customer, $guest = NULL)
    {
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

        $booking = Booking::create($data);

        if ($service->create_zoom_link && $service->user->zoom_token) {
            $zoomLink = Zoom::createMeeting($service->user, $booking->service->name, Carbon::parse("$booking->date $booking->start")->toIso8601ZuluString());
            if ($zoomLink) {
                $booking->update([
                    'zoom_link' => $zoomLink['join_url']
                ]);
            }
        }

        $bookingUser = BookingUser::create([
            'booking_id' => $booking->id,
            'user_id' => $customer->id ?? NULL,
            'guest' => $guest
        ]);

        if ($service->user->google_calendar_token && $service->user->google_calendar_id) {
            $GoogleCalendarClient = new GoogleCalendarClient($service->user);
            $client = $GoogleCalendarClient->client;
            $googleService = new Google_Service_Calendar($client);
            $event = new Google_Service_Calendar_Event([
                'summary' => $booking->service->name,
                'description' => $booking->service->description,
                'start' => [
                    'dateTime' => Carbon::parse("$booking->date $booking->start")->toIso8601String(),
                    'timeZone' => $booking->service->timezone,
                ],
                'end' => [
                    'dateTime' => Carbon::parse("$booking->date $booking->end")->toIso8601String(),
                    'timeZone' => $booking->service->timezone,
                ],
                'attendees' => [
                    ['email' => $bookingUser->user->email ?? $bookingUser->guest->email],
                ],
                'conferenceData' => [
                    'createRequest' => [
                        'requestId' => time()
                    ]
                ]
            ]);

            $event = $googleService->events->insert($service->user->google_calendar_id, $event, ['conferenceDataVersion' => 1]);
            $booking->update([
                'meet_link' => $event->hangoutLink
            ]);
        }

        $from = Carbon::parse("$booking->date $booking->start");
        $to = $from->clone()->addMinute($booking->service->duration);
        $link = Link::create($booking->service->name, $from, $to)
            ->description($booking->service->description);

        $booking->google_link = $link->google();
        $booking->outlook_link = url('/ics?name=' . $booking->service->name . '&data=' . $link->ics());
        $booking->yahoo_link = $link->yahoo();
        $booking->ical_link = $booking->outlook_link;

        return $booking;
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

        return self::book($username, $service_id, $request, NULL, $request->only('email', 'first_name', 'last_name'));
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
            'last_online' => null,
        ]);
        $user->password = bcrypt($request->password);
        $user->role_id = 3;
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