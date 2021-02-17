<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserBookRequest;
use App\Http\Requests\UserFacebookLoginAndBook;
use App\Http\Requests\UserGoogleLoginRequest;
use App\Http\Requests\UserServiceTimeslotsRequest;
use App\Http\Requests\UserSignupAndBookRequest;
use App\Http\Zoom;
use App\Mail\NewBooking;
use App\Models\Booking;
use App\Models\Notification;
use App\Models\Service;
use App\Models\User;
use App\Models\Widget;
use App\Services\UserService;
use Carbon\Carbon;
use Hash;
use Illuminate\Http\Request;
use Mail;
use Response;
use Spatie\CalendarLinks\Link;

class UserController extends Controller
{
    //
    public function index(Request $request)
    {
        return response(UserService::index($request));
    }

    public function profile($username, Request $request)
    {
        return UserService::profile($username, $request);
    }

    public function showService($username, $service_id)
    {
        return UserService::showService($username, $service_id);
    }

    public function serviceTimeslots($username, $service_id, UserServiceTimeslotsRequest $request)
    {
        return response(userService::serviceTimeslots($username, $service_id, $request));
    }

    public function book($username, $service_id, UserBookRequest $request, $customer)
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

        if ($customer->id == $user->id) {
            return abort(403, 'You are not allowed to book using your own account.');
        }

        $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        foreach ($request->timeslots as $timeslot) {
            $start = Carbon::parse("{$timeslot['date']['format']} {$timeslot['timeslot']['time']}");
            $end = $start->copy()->add('minute', $service->duration);
            $booking = $this->createBooking($service, [
                'user_id' => $customer->id,
                'service_id' => $service->id,
                'date' => $timeslot['date']['format'],
                'start' => $start->format('H:i'),
                'end' => $end->format('H:i'),
            ]);
            if ($booking) {
                $bookings[] = $booking;
            }

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
                        $booking = $this->createBooking($service, [
                            'user_id' => $customer->id,
                            'service_id' => $service->id,
                            'date' => $currentDate->clone()->format('Y-m-d'),
                            'start' => $start->format('H:i'),
                            'end' => $end->format('H:i'),
                        ]);
                        if ($booking) {
                            $bookings[] = $booking;
                        }
                    }
                    $currentDate->addDay(1);
                }
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

    protected function createBooking($service, $data)
    {
        $availableTimeslots = $service->timeslots($data['date']);
        $timeslotAvailable = false;
        foreach ($availableTimeslots as $availableTimeslot) {
            if ($availableTimeslot['time'] == $data['start'] && $availableTimeslot['is_available']) {
                $timeslotAvailable = true;
                break;
            }
        }
        if (! $timeslotAvailable) {
            return false;
        }

        $booking = Booking::create($data);

        if ($service->create_zoom_link && $service->user->zoom_token) {
            $zoomLink = Zoom::createMeeting($service->user, $booking->service->name, Carbon::parse("$booking->date $booking->start")->toIso8601ZuluString());
            if ($zoomLink) {
                $booking->update([
                    'zoom_link' => $zoomLink['join_url']
                ]);
            }
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

    public function widget(Request $request)
    {
        return response(UserService::widget($request));
    }

    public function loginAndBook($username, $service_id, UserBookRequest $request)
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

        return $this->book($username, $service_id, $request, $user, true);
    }

    public function signupAndBook($username, $service_id, UserSignupAndBookRequest $request)
    {
        return response(UserService::signupAndBook($username, $service_id, $request));
    }

    public function googleLoginAndBook($username, $service_id, UserGoogleLoginRequest $request)
    {
        return response(UserService::googleLoginAndBook($username, $service_id, $request));
    }

    public function facebookLoginAndBook($username, $service_id, UserFacebookLoginAndBook $request)
    {
        return response(UserService::facebookLoginAndBook($username, $service_id, $request));
    }

    public function getInvoice(Request $request)
    {
        return response(UserService::getInvoice($request));
    }
}
