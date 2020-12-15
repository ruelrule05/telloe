<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use App\Http\StripeAPI;
use App\Models\Booking;
use App\Models\Contact;
use App\Models\Service;
use App\Models\User;
use App\Models\Widget;
use Auth;
use Carbon\Carbon;
use File;
use Hash;
use Illuminate\Http\Request;
use Image;
use Mail;
use Modules\Frontend\Http\Zoom;
use Modules\Frontend\Mail\NewBooking;
use Modules\Frontend\Mail\Welcome;
use Response;
use Spatie\CalendarLinks\Link;

class UserController extends Controller
{
    //
    public function index(Request $request)
    {
        $users = [];
        $query = $request->get('query');
        $users = User::where('id', '<>', Auth::user()->id);
        if ($query) {
            $users = $users->where('email', 'LIKE', '%' . $query . '%');
        }
        $users = $users->orderByRaw('CONCAT(first_name, last_name)')->get();

        return response()->json($users);
    }

    public function profile($username, Request $request)
    {
        $profile = User::where('username', $username)->whereHas('role', function ($role) {
            $role->where('role', 'client');
        })->firstOrfail()->makeHidden(['google_calendar_token', 'outlook_token', 'last_online_format', 'role_id', 'email', 'last_online', 'stripe_customer_id', 'psid']);

        if ($request->ajax() || $request->wantsJson()) {
            $services = $profile->load(['services' => function ($service) {
                $service->where('is_available', true);
            }])->services->load('user', 'assignedServices.member.memberUser');

            $data = [];
            $data['services'] = $services;
            $data['packages'] = $profile->packages()->where('is_available', true)->get();

            return response()->json($data);
        }

        return view('frontend::profile', compact('profile'));
    }

    public function showService($username, $service_id)
    {
        $user = User::where('username', $username)->whereHas('role', function ($role) {
            $role->where('role', 'client');
        })->firstOrfail();
        $service = Service::where('id', $service_id)->where('user_id', $user->id)->firstOrfail();
        return view('frontend::profile', compact('user'));
    }

    public function serviceTimeslots($username, $service_id, Request $request)
    {
        $this->validate($request, [
            'date' => 'required|date'
        ]);

        $user = User::where('username', $username)->whereHas('role', function ($role) {
            $role->where('role', 'client');
        })->firstOrfail();
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

        return response()->json($timeslots);
    }

    public function book($username, $service_id, Request $request, User $authUser = null)
    {
        $this->validate($request, [
            'timeslots' => 'required|array',
        ]);

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

        // $availableTimeslots = $service->timeslots($request->date);
        // $timeslotAvailable = false;
        // foreach ($availableTimeslots as $availableTimeslot) {
        //     foreach ($request->timeslots as $timeslot) {
        //         if ($availableTimeslot['time'] == $timeslot['time'] && $availableTimeslot['is_available']) {
        //             $timeslotAvailable = true;
        //             break;
        //         }
        //     }
        // }
        // if (! $timeslotAvailable) {
        //     return abort(403, 'The selected date or time is not anymore available.');
        // }

        $authUser = $authUser ?? Auth::user();

        if ($authUser->id == $user->id) {
            return abort(403, 'You are not allowed to book using your own account.');
        }

        $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        foreach ($request->timeslots as $timeslot) {
            $start = Carbon::parse("{$timeslot['date']['format']} {$timeslot['timeslot']['time']}");
            $end = $start->copy()->add('minute', $service->duration);
            $booking = $this->createBooking($service, [
                'user_id' => $authUser->id,
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
                    case 'first_week';
                        $weekOfMonth = 1;
                        break;
                    case 'second_week';
                        $weekOfMonth = 2;
                        break;
                    case 'third_week';
                        $weekOfMonth = 3;
                        break;
                    case 'las_week';
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
                            'user_id' => $authUser->id,
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
            Mail::queue(new NewBooking($bookings, $authUser, 'client'));
            Mail::queue(new NewBooking($bookings, $authUser, 'contact'));
        }

        if (! Contact::where('user_id', $user->id)->where('contact_user_id', $authUser->id)->first()) {
            Contact::create([
                'user_id' => $user->id,
                'email' => $authUser->email,
                'contact_user_id' => $authUser->id,
                'is_pending' => false,
            ]);
        }

        return response($bookings);
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
                    'zoom_link' => $zoomLink
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
        $profile = User::with('widget')->where('username', $request->p)->firstOrfail()->makeHidden(['google_calendar_token', 'outlook_token', 'last_online_format', 'role_id', 'email', 'last_online', 'stripe_customer_id', 'psid']);
        $profile->profile_image = config('app.url') . $profile->profile_image;
        echo 'const PROFILE = ' . json_encode($profile) . ";\n\n";
        echo "const ENDPOINT = '" . config('app.url') . "';\n\n";

        $script = File::get(public_path() . '/js/widget/widget.js');
        $response = Response::make($script);
        $response->header('Content-Type', 'text/javascript');
        return $response;
    }

    public function loginAndBook($username, $service_id, Request $request)
    {
        $this->validate($request, [
            'email' => 'nullable|email',
            'password' => 'nullable',
            'timeslots' => 'required|array',
        ]);

        $user = null;
        if ($request->auth) {
            $user = Auth::user();
        } elseif ($request->contact_id) {
            $contact = Contact::findOrFail($request->contact_id);
            $this->authorize('show', $contact);
            $user = $contact->contactUser;
        } else {
            $user = User::where('email', $request->email)->first();
            if (! $user) {
                return abort(403, 'Email does not exists in our records');
            }
            if (! Hash::check($request->password, $user->password)) {
                return abort(403, 'Invalid password');
            }
        }

        if (! $user) {
            return abort(404, 'No user found.');
        }

        return $this->book($username, $service_id, $request, $user);
    }

    public function signupAndBook($username, $service_id, Request $request)
    {
        $exists = User::where('email', $request->email)->first();
        if ($exists) {
            return abort(403, 'Email is already registered to another account.');
        }
        $this->validate($request, [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'date' => 'required|date',
            'timeslots' => 'required|array',
        ]);

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
        $widget = Widget::create([
            'user_id' => $user->id
        ]);

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

        return $this->book($username, $service_id, $request, $user);
    }

    public function googleLoginAndBook($username, $service_id, Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'image_url' => 'required',
            'timeslots' => 'required|array',
        ]);
        $user = User::where('email', $request->email)->first();
        $authController = new AuthController();
        if (! $user || $user->google_id == $request->id) {
            if (! $user) {
                $time = time();
                Image::make($request->image_url)->save(public_path('storage/profile-images/' . $time . '.jpeg'));
                $new_username = $authController->generateUsername($request);
                $user = User::create([
                    'username' => $new_username,
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'email' => $request->email,
                ]);
                $user->role_id = 3;
                $user->profile_image = '/storage/profile-images/' . $time . '.jpeg';
                $user->google_id = $request->id;
                $user->save();
                if (isValidTimezone($request->timezone)) {
                    $user->timezone = $request->timezone;
                    $user->save();
                }
                $widget = Widget::create([
                    'user_id' => $user->id
                ]);
                Mail::queue(new Welcome($user));
            } else {
                if (! Widget::where('user_id', $user->id)->first()) {
                    $widget = Widget::create([
                        'user_id' => $user->id
                    ]);
                }
            }

            $authController->createDefaultField($user);
            $authController->createInitialConversations($user);
            $authController->createPresetService($user);

            return $this->book($username, $service_id, $request, $user);
        }

        $message = "There's no user associated with this Google account.";
        if ($user) {
            $message = 'Email is already registered to another account.';
        }
        return abort(403, $message);
    }

    public function facebookLoginAndBook($username, $service_id, Request $request)
    {
        $this->validate($request, [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'id' => 'required',
            'timeslots' => 'required|array',
        ]);
        $user = User::where('email', $request->email)->first();
        $authController = new AuthController();
        if (! $user || $user->facebook_id == $request->id) {
            if (! $user) {
                $time = time();
                $profile_image = 'http://graph.facebook.com/' . $request->id . '/picture?type=normal';
                Image::make($profile_image)->save(public_path('storage/profile-images/' . $time . '.jpeg'));
                $new_username = $authController->generateUsername($request);
                $user = User::create([
                    'username' => $new_username,
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'email' => $request->email,
                ]);
                $user->profile_image = '/storage/profile-images/' . $time . '.jpeg';
                $user->facebook_id = $request->id;
                $user->save();
                if (isValidTimezone($request->timezone)) {
                    $user->timezone = $request->timezone;
                    $user->save();
                }
                $widget = Widget::create([
                    'user_id' => $user->id
                ]);

                Mail::queue(new Welcome($user));
            } else {
                if (! Widget::where('user_id', $user->id)->first()) {
                    $widget = Widget::create([
                        'user_id' => $user->id
                    ]);
                }
            }

            $authController->createDefaultField($user);
            $authController->createInitialConversations($user);
            $authController->createPresetService($user);

            return $this->book($username, $service_id, $request, $user);
        }

        $message = "There's no user associated with this Facebook account.";
        if ($user) {
            $message = 'Email is already registered to another account.';
        }
        return abort(403, $message);
    }

    public function getInvoice(Request $request)
    {
        if (! $request->invoice_id) {
            return abort(403);
        }

        $stripe_api = new StripeAPI();
        $invoice = $stripe_api->invoice('retrieve', $request->invoice_id, ['stripe_account' => Auth::user()->stripe_account['id']]);

        return response()->json($invoice);
    }
}
