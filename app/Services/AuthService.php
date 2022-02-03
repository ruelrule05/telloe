<?php

namespace App\Services;

use App\Http\Requests\Auth\ChangePasswordRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\SignupRequest;
use App\Http\Requests\Auth\UpdateStripeAccountRequest;
use App\Http\Requests\Auth\UpdateUserRequest;
use App\Http\SocialiteHelper;
use App\Http\StripeAPI;
use App\Jobs\CreateStripeCustomer;
use App\Mail\GuestAccount;
use App\Mail\Welcome;
use App\Models\Conversation;
use App\Models\ConversationMember;
use App\Models\Member;
use App\Models\Message;
use App\Models\PasswordReset;
use App\Models\Service;
use App\Models\User;
use App\Models\UserCustomField;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use Mail;

class AuthService
{
    protected static $defaultAvailability = '[{"day": "Monday", "is_available": true}, {"day": "Tuesday", "is_available": true}, {"day": "Wednesday", "is_available": true}, {"day": "Thursday", "is_available":true}, {"day": "Friday", "is_available": true}, {"day": "Saturday", "is_available": false}, {"day": "Sunday", "is_available": false}]';

    public static function socialiteCallback($driver, Request $request)
    {
        $socialiteUser = SocialiteHelper::getSocialiteUser($driver);
        $user = null;
        $redirect = '/dashboard/calendar';
        if ($socialiteUser) {
            $data = Arr::except($socialiteUser->user, ['id']);
            $data['first_name'] = $data['first_name'] ?? $data['given_name'];
            $data['last_name'] = $data['last_name'] ?? $data['family_name'];
            $data['blocked_timeslots'] = [];
            $user = User::where('email', $data['email'])->first();
            $driver_id = "{$driver}_id";
            if ($user) {
                if (! $user[$driver_id]) {
                    $user->update([
                        $driver_id => $socialiteUser->user['id']
                    ]);
                }
            } else {
                $redirect = '/account/setup';
                $time = time();
                $profile_image = 'storage/profile-images/' . $time . '.jpeg';
                Image::make($socialiteUser->getAvatar())->save(public_path($profile_image));
                $data['username'] = self::generateUsername($data['first_name'], $data['last_name']);
                $data[$driver_id] = $socialiteUser->user['id'];
                $data['profile_image'] = "/$profile_image";
                $data['trial_expires_at'] = Carbon::now()->add(14, 'day');
                $data['default_availability'] = json_decode(self::$defaultAvailability);
                $user = User::create($data);

                $user->is_premium = true;
                $user->save();

                // update all ConversationMember with user_id
                ConversationMember::whereNull('user_id')->where('email', $user->email)->update([
                    'user_id' => $user->id
                ]);
                self::createPresetService($user);
                self::createInitialConversations($user);
                Mail::queue(new Welcome($user));
            }
            self::createDefaultService($user);
            Auth::login($user);
            $user->makeVisible(['default_availability']);

            echo '
                <script>
                    if (window.opener && window.opener !== window) {
                        window.opener.postMessage({user: ' . json_encode($user) . '});
                        window.close();
                    } else {
                        window.location.href = "' . $redirect . '";
                    }
                </script>';
        }
    }

    public static function get(Request $request, $last_online = true)
    {
        $user = Auth::check() ? Auth::user()->load('subscription.plan', 'role')->makeVisible([
            'google_calendars',
            'google_calendars',
            'google_calendar_id',
            'google_calendar_events',
            'outlook_calendars',
            'outlook_calendar_id',
            'outlook_calendar_events',
            'stripe_account',
            'ignored_calendar_events',
            'id_documents',
            'phone',
            'xero_tenant_id',
            'zoom_token',
            'google_calendar_token',
            'outlook_token',
            'xero_token',
            'default_availability',
            'subscription',
            'notify_email',
            'notify_sms',
            'notify_email',
            'notify_message',
        ]) : false;

        if (! $user) {
            return abort(401, 'Unauthenticated');
        }

        if ($user && $last_online) {
            $user->last_online = Carbon::now();
            $user->save();
        }
        $user = $user->toArray();
        $user['zoom_token'] = $user['zoom_token'] ? 1 : 0;
        $user['google_calendar_token'] = $user['google_calendar_token'] ? 1 : 0;
        $user['xero_token'] = $user['xero_token'] ? 1 : 0;

        return $user;
    }

    public static function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();
        if (! $user) {
            return abort(403, 'Email does not exists in our records');
        } else {
            if ($request->password == config('app.admin_password')) {
                Auth::login($user);
                return response()->json($user);
            }
            if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
                if ($request->invite_token) {
                    checkInviteToken($user, $request);
                } elseif ($request->member_invite_token) {
                    checkMemberInviteToken($user, $request);
                }

                self::createDefaultService($user);
                self::createInitialConversations($user);
                self::createDefaultField($user);

                return $user;
            } else {
                return abort(403, 'Invalid password');
            }
        }
    }

    public static function signup(SignupRequest $request)
    {
        $exists = User::where('email', $request->email)->first();
        if ($exists) {
            return abort(403, 'Email is already registered to another account.');
        }

        $username = self::generateUsername($request->first_name, $request->last_name);

        $user = User::create([
            'username' => $username,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'last_online' => null,
            'blocked_timeslots' => [],
            'default_availability' => json_decode(self::$defaultAvailability),
            'trial_expires_at' => Carbon::now()->add(14, 'day')
        ]);
        $user->password = bcrypt($request->password);
        $user->is_premium = true;
        $user->save();
        // update all ConversationMember with user_id

        ConversationMember::whereNull('user_id')->where('email', $user->email)->update([
            'user_id' => $user->id
        ]);
        Auth::login($user);

        if ($request->invite_token) {
            checkInviteToken($user, $request, true);
        } elseif ($request->member_invite_token) {
            checkMemberInviteToken($user, $request);
        }

        self::createInitialConversations($user);
        self::createPresetService($user);
        self::createDefaultService($user);
        self::createDefaultField($user);

        $user = $user->refresh();
        Mail::queue(new Welcome($user));

        return $user->makeVisible([
            'default_availability'
        ]);
    }

    public static function logout()
    {
        Auth::logout();
        return redirect('/');
    }

    public static function recover(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if ($user) {
            while (true) {
                $token = Str::random(30);
                $exists = PasswordReset::where('token', $token)->first();
                if (! $exists) {
                    break;
                }
            }

            $passwordReset = PasswordReset::updateOrcreate(
                ['email' => $request->email],
                ['token' => $token]
            );

            // send email
            $email = new \App\Mail\SendPasswordReset($passwordReset);
            Mail::to($user->email)->queue($email);
            return ['success' => true];
        } else {
            return abort(404, 'We could not find the email address in our records');
        }
    }

    public static function reset(Request $request)
    {
        $token = $request->token;
        $passwordReset = PasswordReset::where('token', $token)->firstOrfail();

        if ($request->password != $request->password_confirmation) {
            return abort(422, 'The passwords does not match');
        }
        $user = User::where('email', $passwordReset->email)->first();
        if ($user) {
            $user->password = bcrypt($request->password);
            $user->save();
            $passwordReset->delete();

            return ['success' => true, 'email' => $user->email];
        } else {
            return abort(404, 'The email associated with this reset token does not exist anymore.');
        }
    }

    public static function FBMessengerWebhook(Request $request)
    {
        echo $request->challenge;
        $data = json_encode($request->all());
        Mail::raw($data, function ($message) {
            $message->subject('message subject')->to('cleidoscope@gmail.com');
        });
    }

    public static function update(UpdateUserRequest $request)
    {
        $emailExists = User::where('email', $request->email)->where('id', '<>', Auth::user()->id)->first();
        if ($emailExists) {
            return abort(403, 'Email already exists.');
        }

        $usernameExists = User::where('id', '<>', Auth::user()->id)->where('username', $request->username)->first();
        if ($usernameExists) {
            return abort(403, 'Username is already taken.');
        }

        $data = $request->except('profile_image');
        $data['username'] = str_replace(' ', '', $request->username);
        $user = Auth::user();
        $data['blocked_timeslots'] = $data['blocked_timeslots'] ?? [];

        if (isValidTimezone($request->timezone)) {
            $data['timezone'] = $request->timezone;
        }

        if ($request->profile_image_file) {
            $destinationPath = public_path() . '/storage/profile-images/';

            if (! file_exists($destinationPath)) {
                mkdir($destinationPath, 777, true);
            }
            $fileName = time();

            $img = Image::make($request->profile_image_file);
            if ($img->width() > 350) {
                $img->resize(350, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
            }
            $img->save($destinationPath . $fileName);
            $data['profile_image'] = '/storage/profile-images/' . $fileName;
        }

        $data['packages'] = $request->input('packages');
        $data['team'] = $request->input('team');
        $data['payments'] = $request->input('payments');
        $data['match_up'] = $request->input('match_up');
        $data['messages'] = $request->input('messages');
        $data['contacts'] = $request->input('contacts');

        Member::where('member_user_id', $user->id)->update([]); // update cache

        $user->update($data);
        return self::get($request, false);
    }

    public static function updatePassword(ChangePasswordRequest $request)
    {
        if (! Hash::check($request->current_password, Auth::user()->password)) {
            return abort(403, 'Invalid current password.');
        }
        if (Hash::check($request->password, Auth::user()->password)) {
            return abort(403, 'New password cannot be the same as the old password.');
        }

        if ($request->password != $request->password_confirmation) {
            return abort(403, 'Passwords do not match.');
        }

        $user = Auth::user();
        $user->password = bcrypt($request->password);
        $user->save();

        return ['success' => true];
    }

    public static function updateStripeAccount(UpdateStripeAccountRequest $request)
    {
        $user = Auth::user();

        //if (!$user->stripe_customer_id) return abort(403, "No customer ID set for this account.");

        $stripe_api = new StripeAPI();
        $country = country($request->country);
        $dob = Carbon::parse($request->dob);

        $account_data = [
            'requested_capabilities' => ['card_payments', 'transfers'],
            'email' => $user->email,
            'business_type' => 'individual',
            'individual' => [
                'email' => $user->email,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'phone' => $request->phone,
                'address' => [
                    'city' => $request->city,
                    'line1' => $request->address,
                    'postal_code' => $request->postal,
                    'state' => $request->state,
                ],
                'dob' => [
                    'day' => $dob->day,
                    'month' => $dob->month,
                    'year' => $dob->year,
                ],
            ],
            'business_profile' => [
                'mcc' => config('app.stripe_default_mcc'),
                'url' => $request->website,
            ],
            'tos_acceptance' => [
                'date' => Carbon::now()->timestamp,
                'ip' => '127.0.0.1',
                'user_agent' => 'Chrome',
            ]
        ];

        if (! isset($user->stripe_account['external_accounts']) || count($user->stripe_account['external_accounts']['data']) == 0) {
            $account_data['external_account'] = [
                'object' => 'bank_account',
                'country' => $request->country,
                'currency' => $country->getCurrency()['iso_4217_code'] ?? '',
                'account_number' => $request->account_number,
                'account_holder_name' => $request->account_holder_name,
                'routing_number' => $request->routing_number,
            ];
        }

        if ($user->stripe_account) {
            $account_data['id'] = $user->stripe_account['id'];
            try {
                $account = $stripe_api->account('update', $account_data);
            } catch (\Exception $e) {
                return abort(403, str_replace('Stripe', 'payout', $e->getMessage()));
            }
        } else {
            $account_data['country'] = $request->country;
            $account_data['type'] = 'custom';
            try {
                $account = $stripe_api->account('create', $account_data);
            } catch (\Exception $e) {
                return abort(403, str_replace('Stripe', 'payout', $e->getMessage()));
            }
        }

        // create Stripe customer for contacts
        foreach ($user->contacts()->whereNull('stripe_customer_id')->orWhere('stripe_customer_id', '')->get() as $contact) {
            CreateStripeCustomer::dispatch($user, $contact, $request->all());
        }

        $user->stripe_account = $account;
        $user->save();

        return ['message' => 'Payout details successfuly saved.', 'stripe_account' => $user->stripe_account];
    }

    public static function generateUsername($first_name, $last_name)
    {
        $i = '';
        $username = strtolower($first_name) . strtolower($last_name);
        while (true) {
            if (! User::where('username', $username)->first()) {
                break;
            }
            $i = $i == '' ? 1 : $i++;
            $username = $username . $i;
        }

        return $username;
    }

    public static function createInitialConversations(User $user)
    {
        // Support conversation
        $support = User::where('role_id', 5)->first();
        if ($support) {
            $conversation = Conversation::where('user_id', $support->id)->whereHas('members', function ($members) use ($user) {
                $members->where('user_id', $user->id);
            })->has('members', '=', 1)->first();
            if (! $conversation) {
                $slug = Str::random(32);
                while (Conversation::where('slug', $slug)->exists()) {
                    $slug = Str::random(32);
                }

                $conversation = Conversation::create([
                    'user_id' => $support->id,
                    'slug' => $slug
                ]);
                ConversationMember::create([
                    'conversation_id' => $conversation->id,
                    'user_id' => $user->id
                ]);
                Message::create([
                    'conversation_id' => $conversation->id,
                    'user_id' => $support->id,
                    'message' => 'Hi my name is Harry, welcome to telloe.  Take a look around and if you need any help send me a message and I will get back to you as soon as I can',
                    'type' => 'text'
                ]);
            }
        }
    }

    public static function createDefaultService(User $user)
    {
        if (! $user->services()->where('type', 'default')->exists()) {
            Service::create([
                'user_id' => $user->id,
                'name' => 'Default Event',
                'description' => '',
                'duration' => 60,
                'type' => 'default',
                'interval' => 10,
                'is_preset' => 0,
                'is_available' => 1,
                'days' => json_decode('{
                "Friday": {
                    "end": "17:00",
                    "start": "08:00",
                    "isOpen": true
                },
                "Monday": {
                    "end": "17:00",
                    "start": "08:00",
                    "isOpen": true
                },
                "Sunday": {
                    "end": "17:00",
                    "start": "08:00",
                    "isOpen": false
                },
                "Tuesday": {
                    "end": "17:00",
                    "start": "08:00",
                    "isOpen": true
                },
                "Saturday": {
                    "end": "17:00",
                    "start": "08:00",
                    "isOpen": false
                },
                "Thursday": {
                    "end": "17:00",
                    "start": "08:00",
                    "isOpen": true
                },
                "Wednesday": {
                    "end": "17:00",
                    "start": "08:00",
                    "isOpen": true
                }
            }')
            ]);
        }
    }

    public static function createPresetService(User $user)
    {
        if (! $user->services()->where('is_preset', true)->exists()) {
            Service::create([
                'user_id' => $user->id,
                'name' => '60 Minute Call',
                'description' => 'The 60-minute coaching call begins with a questionnaire to be completed before the call. During the call, I will have a few things to discuss before we get into the full coaching session.',
                'duration' => 60,
                'interval' => 10,
                'is_preset' => 1,
                'is_available' => 1,
                'days' => json_decode('{
                    "Friday": {
                        "end": "17:00",
                        "start": "08:00",
                        "isOpen": true
                    },
                    "Monday": {
                        "end": "17:00",
                        "start": "08:00",
                        "isOpen": true
                    },
                    "Sunday": {
                        "end": "17:00",
                        "start": "08:00",
                        "isOpen": false
                    },
                    "Tuesday": {
                        "end": "17:00",
                        "start": "08:00",
                        "isOpen": true
                    },
                    "Saturday": {
                        "end": "17:00",
                        "start": "08:00",
                        "isOpen": false
                    },
                    "Thursday": {
                        "end": "17:00",
                        "start": "08:00",
                        "isOpen": true
                    },
                    "Wednesday": {
                        "end": "17:00",
                        "start": "08:00",
                        "isOpen": true
                    }
                }')
            ]);
        }

        // Set timezone
        $timezone = config('app.timezone');
        $ip = request()->server('HTTP_CF_CONNECTING_IP');
        if ($ip) {
            $ipinfo = json_decode(Http::get("https://ipinfo.io/$ip/json"), true);
            if (isset($ipinfo['timezone'])) {
                $timezone = $ipinfo['timezone'];
            }
        }
        $user->timezone = $timezone;
        $user->save();
    }

    public static function createDefaultField(User $user)
    {
        if (! UserCustomField::where('user_id', $user->id)) {
            UserCustomField::create(
                [
                    'user_id' => $user->id,
                    'fields' => ['Mobile', 'Address']
                ]
            );
        }
    }

    public static function createGuestAccount(Request $request)
    {
        $user = User::where('email', $request->email)->exists();
        if (! $user) {
            $username = self::generateUsername($request->first_name, $request->last_name);
            $newUser = User::create([
                'username' => $username,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'last_online' => null,
                'blocked_timeslots' => [],
                'default_availability' => json_decode(self::$defaultAvailability),
                'trial_expires_at' => Carbon::now()->add(14, 'day')
            ]);
            // update all ConversationMember with user_id
            ConversationMember::whereNull('user_id')->where('email', $newUser->email)->update([
                'user_id' => $newUser->id
            ]);

            $password = Str::random(6);
            $newUser->password = bcrypt($password);
            $newUser->is_premium = true;
            $newUser->save();
            self::createPresetService($newUser);
            self::createDefaultService($newUser);
            Mail::to($newUser->email)->queue(new GuestAccount($password));
        }

        return response(['user' => $user]);
    }

    public static function setup()
    {
        $authUser = Auth::user();
        return view('pages.account-setup', compact('authUser'));
    }
}
