<?php

namespace App\Services;

use App\Http\Requests\UserFacebookLoginAndBook;
use App\Http\Requests\UserGoogleLoginRequest;
use App\Http\Requests\UserServiceTimeslotsRequest;
use App\Http\Requests\UserSignupAndBookRequest;
use App\Models\Service;
use App\Models\User;
use App\Models\Widget;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Response;

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

    public static function profile($username, Request $request)
    {
        $profile = User::where('username', $username)->firstOrfail()->makeHidden(['google_calendar_token', 'outlook_token', 'last_online_format', 'role_id', 'email', 'last_online', 'stripe_customer_id', 'psid']);

        if ($request->ajax() || $request->wantsJson()) {
            $services = $profile->load(['services' => function ($service) {
                $service->where('is_available', true);
            }])->services->load('user', 'assignedServices.member.memberUser');

            $data = [];
            $data['services'] = $profile->services()->where('is_available', true)->get()->load('user', 'assignedServices.member.memberUser');

            return response()->json($data);
        }

        $service = null;
        if ($request->service_id) {
            $service = Service::with('user', 'assignedServices.member.memberUser')->where('is_available', true)->where('id', $request->service_id)->where('user_id', $profile->id)->firstOrFail();
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
        $profile = User::with('widget')->where('username', $request->p)->firstOrfail()->makeHidden(['google_calendar_token', 'outlook_token', 'last_online_format', 'role_id', 'email', 'last_online', 'stripe_customer_id', 'psid']);
        $profile->profile_image = config('app.url') . $profile->profile_image;
        echo 'const PROFILE = ' . json_encode($profile) . ";\n\n";
        echo "const ENDPOINT = '" . config('app.url') . "';\n\n";

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

        return self::book($username, $service_id, $request, $user);
    }

    public static function googleLoginAndBook($username, $service_id, UserGoogleLoginRequest $request)
    {
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

            return self::book($username, $service_id, $request, $user);
        }

        $message = "There's no user associated with this Google account.";
        if ($user) {
            $message = 'Email is already registered to another account.';
        }
        return abort(403, $message);
    }

    public static function facebookLoginAndBook($username, $service_id, UserFacebookLoginAndBook $request)
    {
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

            return self::book($username, $service_id, $request, $user);
        }

        $message = "There's no user associated with this Facebook account.";
        if ($user) {
            $message = 'Email is already registered to another account.';
        }
        return abort(403, $message);
    }
}
