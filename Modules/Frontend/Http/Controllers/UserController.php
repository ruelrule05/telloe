<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Service;
use App\Models\Booking;
use App\Models\Widget;
use App\Models\Contact;
use Carbon\Carbon;
use Auth;
use Hash;
use File;
use Response;
use Mail;
use Modules\Frontend\Mail\NewBooking;
use Modules\Frontend\Mail\Welcome;
use Image;
use App\Http\Controllers\AuthController;

class UserController extends Controller
{
    //
    public function index(Request $request)
    {
        $users = [];
        $query = $request->get('query');
        $users = User::where('id', '<>', Auth::user()->id);
        if($query):
            $users = $users->where('email', 'LIKE', '%' . $query. '%');
        endif;
        $users = $users->orderByRaw('CONCAT(first_name, last_name)')->get();

        return response()->json($users);
    }


    public function profile($username, Request $request)
    {
    	$profile = User::where('username', $username)->whereHas('role', function($role) {
            $role->where('role', 'client');
        })->firstOrfail()->makeHidden(['google_calendar_token', 'outlook_token', 'last_online_format', 'role_id', 'email', 'last_online', 'stripe_customer_id', 'psid']);

        if($request->ajax() || $request->wantsJson()) :
            $profile->load(['services' => function($service) {
                $service->where('is_available', true)->where('in_widget', true);
            }]);

            return response()->json($profile->services);
        endif;

    	return view('frontend::profile', compact('profile'));
    }

    public function showService($username, $service_id)
    {
        $user = User::where('username', $username)->whereHas('role', function($role) {
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
        $user = User::where('username', $username)->whereHas('role', function($role) {
            $role->where('role', 'client');
        })->firstOrfail();
        $service = Service::where('id', $service_id)->where('user_id', $user->id)->firstOrfail();
        $timeslots = $service->timeslots($request->date);
        
        return response()->json($timeslots);
    }

    public function book($username, $service_id, Request $request, User $authUser = null)
    {
        $this->validate($request, [
            'date' => 'required|date',
            'time' => 'required',
        ]);

        $user = User::where('username', $username)->firstOrfail();
        $service = Service::where('id', $service_id)->where('user_id', $user->id)->firstOrfail();
        $timeslots = $service->timeslots($request->date);

        $timeslotAvailable = false;
        foreach($timeslots as $timeslot) :
            if($timeslot['time'] == $request->time) :
                $timeslotAvailable = true;
                break;
            endif;
        endforeach;

        if(!$timeslotAvailable) return abort(403, 'The selected date or time is not anymore available.');

        $start = Carbon::parse("$request->date $request->time");
        $end = $start->copy()->add('minute', $service->duration);

        $authUser = $authUser ?? Auth::user();

        if($authUser->id == $user->id) return abort(403, 'You are not allowed to book using your own account.');

        $booking = Booking::create([
            'user_id' => $authUser->id,
            'service_id' => $service->id,
            'date' => $request->date,
            'start' => $start->format('H:i'),
            'end' => $end->format('H:i'),
        ]);


        if(!Contact::where('user_id', $user->id)->where('contact_user_id', $authUser->id)->first()) :
            Contact::create([
                'user_id' => $user->id,
                'contact_user_id' => $authUser->id,
                'is_pending' => false,
            ]);
        endif;

        Mail::queue(new NewBooking($booking, $authUser));

        return response()->json(['success' => true]);
    }


    public function widget(Request $request)
    {
        $profile = User::with('widget')->where('username', $request->p)->firstOrfail()->makeHidden(['google_calendar_token', 'outlook_token', 'last_online_format', 'role_id', 'email', 'last_online', 'stripe_customer_id', 'psid']);
        $profile->profile_image = config('app.url') . $profile->profile_image;
        echo 'const PROFILE = ' . json_encode($profile) .";\n\n";
        $script = File::get(public_path().'/js/widget/widget.js');
        $response = Response::make($script);
        $response->header('Content-Type', "text/js");
        return $response;
    }

    public function loginAndBook($username, $service_id, Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required',
            'date' => 'required|date',
            'time' => 'required',
        ]);
        $user = User::where('email', $request->email)->first();
        if (!$user) return abort(403, 'Email does not exists in our records');
        if (!Hash::check($request->password, $user->password)) return abort(403, 'Invalid password');

        return $this->book($username, $service_id, $request, $user);
    }


    public function signupAndBook($username, $service_id, Request $request)
    {
        $exists = User::where('email', $request->email)->first();
        if ($exists) return abort(403, 'Email is already registered to another account.');
        $this->validate($request, [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'date' => 'required|date',
            'time' => 'required',
        ]);

        $authController = new AuthController();
        $new_username = $authController->generateUsername($request);
        $user = User::create([
            'username' => $new_username,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'last_online' => NULL,
        ]);
        $user->password = bcrypt($request->password);
        $user->role_id = 3;
        $user->save();
        $widget = Widget::create([
            'user_id' => $user->id
        ]);

        if(isValidTimezone($request->timezone)) :
            $user->timezone = $request->timezone;
            $user->save();
        endif;


        $authController->createDefaultField($user);
        $authController->createInitialConversations($user);
        $authController->createPresetService($user);
        
        $user = $user->refresh();
        if($user->role->role == 'client') :
            Mail::queue(new Welcome($user));
        endif;
        
        return $this->book($username, $service_id, $request, $user);
    }


    public function googleLoginAndBook($username, $service_id, Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'image_url' => 'required'
        ]);
        $user = User::where('email', $request->email)->first();
        $authController = new AuthController();
        if(!$user || $user->google_id == $request->id) :
            if(!$user) :
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
                if(isValidTimezone($request->timezone)) :
                    $user->timezone = $request->timezone;
                    $user->save();
                endif;
                $widget = Widget::create([
                    'user_id' => $user->id
                ]);
                Mail::queue(new Welcome($user));
            else:
                if(!Widget::where('user_id', $user->id)->first()) :
                    $widget = Widget::create([
                        'user_id' => $user->id
                    ]);
                endif;
            endif;

            $authController->createDefaultField($user);
            $authController->createInitialConversations($user);
            $authController->createPresetService($user);


            return $this->book($username, $service_id, $request, $user);
        endif;

        $message = "There's no user associated with this Google account.";
        if($user) $message = "Email is already registered to another account.";
        return abort(403, $message);
    }


    public function facebookLoginAndBook($username, $service_id, Request $request)
    {
        $this->validate($request, [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'id' => 'required'
        ]);
        $user = User::where('email', $request->email)->first();
        $authController = new AuthController();
        if(!$user || $user->facebook_id == $request->id) :
            if(!$user) :
                $time = time();
                $profile_image = 'http://graph.facebook.com/'.$request->id.'/picture?type=normal';
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
                if(isValidTimezone($request->timezone)) :
                    $user->timezone = $request->timezone;
                    $user->save();
                endif;
                $widget = Widget::create([
                    'user_id' => $user->id
                ]);

                Mail::queue(new Welcome($user));
            else:
                if(!Widget::where('user_id', $user->id)->first()) :
                    $widget = Widget::create([
                        'user_id' => $user->id
                    ]);
                endif;
            endif;

            $authController->createDefaultField($user);
            $authController->createInitialConversations($user);
            $authController->createPresetService($user);

            return $this->book($username, $service_id, $request, $user);
        endif;

        $message = "There's no user associated with this Facebook account.";
        if($user) $message = "Email is already registered to another account.";
        return abort(403, $message);
    }
    
}
