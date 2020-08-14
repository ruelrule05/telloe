<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Service;
use App\Models\Booking;
use Carbon\Carbon;
use Auth;
use Hash;
use File;
use Response;
use Mail;
use Modules\Frontend\Mail\NewBooking;

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

        $user = User::where('username', $username)->whereHas('role', function($role) {
            $role->where('role', 'client');
        })->firstOrfail();
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
}
