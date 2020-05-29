<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Service;
use App\Models\Booking;
use Carbon\Carbon;
use Auth;

class UserController extends Controller
{
    //

    public function profile($username, Request $request)
    {
    	$user = User::where('username', $username)->firstOrfail();

        if($request->ajax()) :
            $user->load(['services' => function($service) {
                $service->where('is_available', true);
            }]);

            return response()->json($user->services);
        endif;

    	return view('frontend.profile', compact('user'));
    }

    public function serviceTimeslots($username, $service_id, Request $request)
    {
        $this->validate($request, [
            'date' => 'required|date'
        ]);
        $user = User::where('username', $username)->firstOrfail();
        $service = Service::where('id', $service_id)->where('user_id', $user->id)->firstOrfail();
        $timeslots = $service->timeslots($request->date);
        
        return response()->json($timeslots);
    }

    public function search(Request $request)
    {
        $users = [];
        if($request->search ):
            $users = User::where('email', 'LIKE', '%' . $request->search . '%')->get();
        endif;

        return response()->json($users);
    }

    public function book($username, $service_id, Request $request)
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

        Booking::create([
            'user_id' => Auth::user()->id,
            'service_id' => $service->id,
            'date' => $request->date,
            'start' => $start->format('H:i'),
            'end' => $end->format('H:i'),
        ]);

        return response()->json(['success' => true]);
    }


}
