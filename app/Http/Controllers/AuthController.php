<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\UserCustomer;
use App\Models\PasswordReset;
use App\Models\Inquiry;
use App\Models\Booking;
use App\Models\Widget;
use App\Models\Conversation;
use App\Models\ConversationMember;
use Illuminate\Support\Str;
use Auth;
use Mail;
use Image;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use App\Http\StripeAPI;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function get(Request $request, $last_online = true)
    {
        $user = Auth::check() ? Auth::user()->load('widget.widgetRules', 'subscription', 'role')->makeVisible([
            'google_calendars',
            'google_calendars', 
            'google_calendar_id', 
            'google_calendar_events', 
            'outlook_calendars', 
            'outlook_calendar_id', 
            'outlook_calendar_events',
            'stripe_account',
            'ignored_calendar_events',
            'id_documents'
        ]) : false;

        if($user && $last_online) :
            $user->update([
                'last_online' => Carbon::now()
            ]);
        endif;
        
        return response()->json($user);
    }

    public function login(Request $request) {
        $this->validate($request, [
            'email' => 'required|email'
        ]);
        $user = User::where('email', $request->email)->first();
        if (!$user):
            return abort(403, 'Email does not exists in our records');
        else :
            if (Auth::attempt(['email' => $request->email, 'password' => $request->password])):
                $response = [
                    'redirect_url' => $request->redirect ?? redirect()->back()->getTargetUrl(),
                ];

                // check invite token
                if($request->invite_token) :
                    $userCustomer = UserCustomer::where('invite_token', $request->invite_token)->where('email', $user->email)->where('is_pending', true)->first();
                    if($userCustomer) :
                        $userCustomer->update([
                            'customer_id' => $user->id,
                            'is_pending' => false
                        ]);
                    endif;
                endif;

                if(isValidTimezone($request->timezone)) :
                    $user->update([
                        'timezone' => $request->timezone
                    ]);
                endif;

                $this->createStripeCustomer($user);

                return response()->json($response);
            else:
                return abort(403, 'Invalid password');
            endif;
        endif;
    }


    public function signup(Request $request) {
        $exists = User::where('email', $request->email)->first();
        if ($exists) return abort(403, 'Email is already registered to another account.');
		$this->validate($request, [
			'first_name' => 'required',
			'last_name' => 'required',
			'email' => 'required|email|unique:users,email',
			'password' => 'required',
		]);
        $widget = Widget::create([]);

        $i = '';
        $username = strtolower($request->first_name).strtolower($request->last_name);
        while(true):
            if(!User::where('username', $username)->first()) break;
            $i = $i == '' ? 1 : $i++;
            $username = $username.$i;
        endwhile;

        $timezone = $request->timezone;
        if(!isValidTimezone($timezone)) :
            $timezone = NULL;
        endif;
		$user = User::create([
            'username' => $username,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'widget_id' => $widget->id,
            'last_online' => NULL,
            'timezone' => $timezone,
        ]);
		Auth::login($user);
        $this->createStripeCustomer($user);
        
        // check invite token
        if($request->invite_token) :
            $userCustomer = UserCustomer::where('invite_token', $request->invite_token)->where('email', $user->email)->where('is_pending', true)->first();
            if($userCustomer) :
                $user->role_id = 3;
                $user->save();
                $userCustomer->update([
                    'customer_id' => $user->id,
                    'is_pending' => false
                ]);
                $conversation = Conversation::where('user_customer_id', $userCustomer->id)->first();
                if($conversation) :
                    ConversationMember::create([
                        'conversation_id' => $conversation->id,
                        'user_id' => $user->id
                    ]);
                endif;
            endif;
        endif;

        $response = [
            'redirect_url' => $request->redirect ?? redirect()->back()->getTargetUrl(),
        ];
		return response()->json($response);
    }


    public function logout() {
        Auth::logout();
        return redirect('/');
    }


    public function recover(Request $request) {
        $user = User::where('email', $request->email)->first();
        if ($user):
            while (true):
                $token = Str::random(30);
                $exists = PasswordReset::where('token', $token)->first();
                if (!$exists) break;
            endwhile;

            $passwordReset = PasswordReset::updateOrcreate(
                ['email' => $request->email],
                ['token' => $token]
            );

            // send email
            $email = new \App\Mail\SendPasswordReset($passwordReset);
            Mail::to($user->email)->send($email);


            return response()->json(['success' => true]); 
        else:
            return abort(404, 'We could not find the email address in our records');
        endif;
    }

    public function reset(Request $request) {
        $token = $request->token;
        $passwordReset = PasswordReset::where('token', $token)->firstOrfail();

        $this->validate($request, [
            'password' => 'required|max:100'
        ]);
        if ($request->password != $request->password_confirmation) return abort(422, 'The passwords does not match');
        $user = User::where('email', $passwordReset->email)->first();
        if ($user):
            $user->update([
                'password' => bcrypt($request->password)
            ]);
            $passwordReset->delete();

            return response()->json(['success' => true]); 
        else:
            return abort(404, 'The email associated with this reset token does not exist anymore.');
        endif;

    }

    public function FBMessengerWebhook(Request $request)
    {
        echo $request->challenge;
        $data = json_encode($request->all());
        Mail::raw($data, function($message) {
           $message->subject('message subject')->to('cleidoscope@gmail.com');
        });
    }

    public function update(Request $request)
    {
        $this->validate($request, [
            'username' => 'required',
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
        ]);
        $emailExists = User::where('email', $request->email)->where('id', '<>', Auth::user()->id)->first();
        if($emailExists) return abort(403, 'Email already exists.');

        $usernameExists = User::where('id', '<>', Auth::user()->id)->where('username', $request->username)->first();
        if($usernameExists) return abort(403, 'Username is already taken.');

        $data = $request->all();
        $data['username'] = str_replace(' ', '', $request->username);
        $user = Auth::user();
        $user->update($data);
        return $this->get($request, false);
    }

    public function updatePassword(Request $request)
    {
        $this->validate($request, [
            'current_password' => 'required',
            'password' => 'required',
            'password_confirmation' => 'required',
        ]);

        if(!Hash::check($request->current_password, Auth::user()->password)) return abort(403, 'Invalid current password.');

        if($request->password != $request->password_confirmation) return abort(403, 'Passwords do not match.');

        Auth::user()->update([
            'password' => bcrypt($request->password)
        ]);

        return response()->json(['success' => true]);

    }

    

    public function loginFacebook(Request $request)
    {
        $this->validate($request, [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'id' => 'required'
        ]);
        $user = User::where('email', $request->email)->first();
        if(!$user || $user->facebook_id == $request->id) :
            if(!$user) :
                $time = time();
                $profile_image = 'http://graph.facebook.com/'.$request->id.'/picture?type=normal';
                Image::make($profile_image)->save(public_path('storage/profile-images/' . $time . '.jpeg'));
                $widget = Widget::create([]);
                $user = User::create([
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'email' => $request->email,
                    'facebook_id' => $request->id,
                    'profile_image' => '/storage/profile-images/' . $time . '.jpeg',
                    'widget_id' => $widget->id
                ]);
            endif;
            Auth::login($user);
            $response = [
                'redirect_url' => $request->redirect ?? redirect()->back()->getTargetUrl(),
            ]; 
            return response()->json($response);
        endif;
        return abort(403, "There's no user associated with this Facebook account.");
    }

    public function loginGoogle(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'image_url' => 'required'
        ]);
        $user = User::where('email', $request->email)->first();
        if(!$user || $user->facebook_id == $request->id) :
            if(!$user) :
                $time = time();
                Image::make($request->image_url)->save(public_path('storage/profile-images/' . $time . '.jpeg'));
                $widget = Widget::create([]);
                $user = User::create([
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'email' => $request->email,
                    'google' => $request->id,
                    'profile_image' => '/storage/profile-images/' . $time . '.jpeg',
                    'widget_id' => $widget->id
                ]);
            endif;
            Auth::login($user);
            $response = [
                'redirect_url' => $request->redirect ?? redirect()->back()->getTargetUrl(),
            ]; 
            return response()->json($response);
        endif;
        return abort(403, "There's no user associated with this Google account.");
    }

    public function createStripeCustomer(User $user)
    {
        $stripe_api = new StripeAPI();

        if (!$user->stripe_customer_id) :
            $customer = $stripe_api->customer('create', [ 'email' => $user->email ]);
            $user->update([
                'stripe_customer_id' => $customer->id
            ]);
        endif;
    }

    public function updateStripeAccount(Request $request)
    {   
        $validator = Validator::make($request->all(), [
            'country' => 'required',
            'address' => 'required',
            'city' => 'required',
            'state' => 'required',
            'postal' => 'required',
            'website' => 'required|url',
            'phone' => 'required',
            'dob' => 'required|date',
            'account_number' => 'required',
            'account_holder_name' => 'required',
            'routing_number' => 'required',
        ]);
        $user = Auth::user();

        if ($validator->fails()) return abort(422, $validator->errors());
        if (!$user->stripe_customer_id) return abort(403, "No customer ID set for this account.");

        $stripe_api = new StripeAPI();
        $country = country('AU');
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
                'mcc' => env('STRIPE_DEFAULT_MCC'),
                'url' => $request->website,
            ],
            'tos_acceptance' => [
                'date' => Carbon::now()->timestamp,
                'ip' => '127.0.0.1',
                'user_agent' => 'Chrome',
            ]
        ];

        if($user->stripe_account) :
            if(!isset($user->stripe_account['external_accounts']) || count($user->stripe_account['external_accounts']['data']) == 0) :
                $account_data['external_account'] = [
                    'object' => 'bank_account',
                    'country' => $request->country,
                    'currency' => $country->getCurrency()['iso_4217_code'] ?? '',
                    'account_number' => $request->account_number,
                    'account_holder_name' => $request->account_holder_name,
                    'routing_number' => $request->routing_number,
                ];
            endif;
            $account_data['id'] = $user->stripe_account['id'];
            $account = $stripe_api->account('update', $account_data);
        else :
            $account_data['country'] = $request->country;
            $account_data['type'] = 'custom';
            $account = $stripe_api->account('create', $account_data);
        endif;

        $user->update([
            'stripe_account' => $account
        ]);

        return response()->json(['message' => 'Payout details successfuly saved.', 'stripe_account' => $user->stripe_account]);
    }
}
