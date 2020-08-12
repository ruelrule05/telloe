<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Contact;
use App\Models\PasswordReset;
use App\Models\Inquiry;
use App\Models\Booking;
use App\Models\Widget;
use App\Models\Conversation;
use App\Models\ConversationMember;
use App\Models\UserCustomField;
use App\Models\Message;
use App\Models\Service;
use Illuminate\Support\Str;
use Auth;
use Mail;
use Image;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use App\Http\StripeAPI;
use Illuminate\Support\Facades\Validator;
use App\Jobs\CreateStripeCustomer;
use Modules\Frontend\Mail\Welcome;

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
            $user->last_online = Carbon::now();
            $user->save();
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

                if(isValidTimezone($request->timezone)) :
                    $user->timezone = $request->timezone;
                    $user->save();
                endif;

                checkInviteToken($user, $request);
                $this->createPresetService($user);
                $this->createInitialConversations($user);
                $this->createDefaultField($user);
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

        $username = $this->generateUsername($request);

		$user = User::create([
            'username' => $username,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'widget_id' => $widget->id,
            'last_online' => NULL,
        ]);
        $user->password = bcrypt($request->password);
        $user->save();

        if(isValidTimezone($request->timezone)) :
            $user->timezone = $request->timezone;
            $user->save();
        endif;


		Auth::login($user);
        checkInviteToken($user, $request, true);
        $this->createInitialConversations($user);
        $this->createPresetService($user);
        $this->createDefaultField($user);
        
        $user = $user->refresh();
        if($user->role->role == 'client') :
            Mail::queue(new Welcome($user));
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
            $email = new \Modules\Frontend\Mail\SendPasswordReset($passwordReset);
            Mail::to($user->email)->queue($email);


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
            $user->password = bcrypt($request->password);
            $user->save();
            $passwordReset->delete();

            return response()->json(['success' => true, 'email' => $user->email]); 
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
            'profile_image_file' => 'nullable|mimes:jpeg,png',
        ]);
        $emailExists = User::where('email', $request->email)->where('id', '<>', Auth::user()->id)->first();
        if($emailExists) return abort(403, 'Email already exists.');

        $usernameExists = User::where('id', '<>', Auth::user()->id)->where('username', $request->username)->first();
        if($usernameExists) return abort(403, 'Username is already taken.');

        $data = $request->all();
        $data['username'] = str_replace(' ', '', $request->username);
        $user = Auth::user();

        if($request->hasFile('profile_image_file') && $request->file('profile_image_file')->isValid()) :
            $destinationPath = 'storage/profile-images/';
            $extension = $request->profile_image_file->extension();
            $fileName = time() . '.' . $extension;

            $img = Image::make($request->profile_image_file);
            if ($img->width() > 350) :
                $img->resize(350, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
            endif;
            $img->save($destinationPath.$fileName);
            $user->profile_image = '/'.$destinationPath.$fileName;
            $user->save();
        endif;

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

        $user = Auth::user();
        $user->password = bcrypt($request->password);
        $user->save();

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
            $isNew = false;
            if(!$user) :
                $isNew = true;
                $time = time();
                $profile_image = 'http://graph.facebook.com/'.$request->id.'/picture?type=normal';
                Image::make($profile_image)->save(public_path('storage/profile-images/' . $time . '.jpeg'));
                $widget = Widget::create([]);
                $username = $this->generateUsername($request);
                $user = User::create([
                    'username' => $username,
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'email' => $request->email,
                    'widget_id' => $widget->id
                ]);
                $user->profile_image = '/storage/profile-images/' . $time . '.jpeg';
                $user->facebook_id = $request->id;
                $user->save();
                if(isValidTimezone($request->timezone)) :
                    $user->timezone = $request->timezone;
                    $user->save();
                endif;

                Mail::queue(new Welcome($user));
                $this->createDefaultField($user);
            endif;
            Auth::login($user);
            checkInviteToken($user, $request, $isNew);
            $this->createInitialConversations($user);
            $this->createPresetService($user);
            $response = [
                'redirect_url' => $request->redirect ?? redirect()->back()->getTargetUrl(),
            ]; 
            return response()->json($response);
        endif;

        $message = "There's no user associated with this Facebook account.";
        if($request->action == 'signup' && $user) $message = "Email is already registered to another account.";
        return abort(403, $message);
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
        if(!$user || $user->google_id == $request->id) :
            $isNew = false;
            if(!$user) :
                $isNew = true;
                $time = time();
                Image::make($request->image_url)->save(public_path('storage/profile-images/' . $time . '.jpeg'));
                $widget = Widget::create([]);
                $username = $this->generateUsername($request);
                $user = User::create([
                    'username' => $username,
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'email' => $request->email,
                    'widget_id' => $widget->id,
                ]);
                $user->profile_image = '/storage/profile-images/' . $time . '.jpeg';
                $user->google_id = $request->id;
                $user->save();
                if(isValidTimezone($request->timezone)) :
                    $user->timezone = $request->timezone;
                    $user->save();
                endif;
                Mail::queue(new Welcome($user));
                $this->createDefaultField($user);
            endif;
            Auth::login($user);
            checkInviteToken($user, $request, $isNew);
            $this->createInitialConversations($user);
            $this->createPresetService($user);
            $response = [
                'redirect_url' => $request->redirect ?? redirect()->back()->getTargetUrl(),
            ]; 
            return response()->json($response);
        endif;

        $message = "There's no user associated with this Google account.";
        if($request->action == 'signup' && $user) $message = "Email is already registered to another account.";
        return abort(403, $message);
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
        //if (!$user->stripe_customer_id) return abort(403, "No customer ID set for this account.");

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

        if($user->stripe_account) :
            $account_data['id'] = $user->stripe_account['id'];
            $account = $stripe_api->account('update', $account_data);
        else :
            $account_data['country'] = $request->country;
            $account_data['type'] = 'custom';
            $account = $stripe_api->account('create', $account_data);
        endif;

        // create Stripe customer for contacts
        foreach(Auth::user()->contacts as $contact) :
            CreateStripeCustomer::dispatch($user, $contact);
        endforeach;

        $user->stripe_account = $account;
        $user->save();

        return response()->json(['message' => 'Payout details successfuly saved.', 'stripe_account' => $user->stripe_account]);
    }

    public function generateUsername(Request $request)
    {
        $i = '';
        $username = strtolower($request->first_name).strtolower($request->last_name);
        while(true):
            if(!User::where('username', $username)->first()) break;
            $i = $i == '' ? 1 : $i++;
            $username = $username.$i;
        endwhile;

        return $username;
    }

    public function createInitialConversations(User $user)
    {
        // Support conversation
        $support = User::where('role_id', 5)->first();
        $conversation = Conversation::where('user_id', $support->id)->whereHas('members', function($members) use ($user) {
            $members->where('user_id', $user->id);
        })->has('members', '=', 1)->first();
        if(!$conversation) :
            $conversation = Conversation::create([
                'user_id' => $support->id
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
        endif;
    }

    public function createPresetService(User $user)
    {
        $presetService = $user->services()->where('is_preset', true)->first();
        if(!$presetService) :
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
        endif;
    }

    public function createDefaultField(User $user)
    {
        UserCustomField::firstOrCreate(
            [
                'user_id' => $user->id,
            ],
            [
                'fields' => ['First Name', 'Last Name', 'Email', 'Mobile', 'Address']
            ]
        );
    }
    
}
