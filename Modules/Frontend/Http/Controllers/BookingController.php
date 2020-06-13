<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Booking;
use Auth;
use Carbon\Carbon;

class BookingController extends Controller
{

    public function serviceTimeslots($service_id, Request $request)
    {
        $this->validate($request, [
            'date' => 'required|date'
        ]);
        $service = Service::where('id', $service_id)->where('user_id', $user->id)->firstOrfail();
        $timeslots = $service->timeslots($request->date);
        
        return response()->json($timeslots);
    }

	public function index(Request $request)
    {
    	$this->validate($request, [
    		'user_id' => 'nullable|exists:users,id'
    	]);

        $role = Auth::user()->role->role;
        if($role == 'client') :
            $bookings = Booking::with('user', 'service')->whereHas('service', function($service) {
                    $service->where('user_id', Auth::user()->id);
                })->orderBy('created_at', 'DESC');
            if($request->user_id) :
                $bookings = $bookings->where('user_id', $request->user_id);
            endif;
            $bookings = $bookings->get();
        elseif($role == 'customer') :
            $bookings = Booking::with('service.user')->where('user_id', Auth::user()->id)->orderBy('created_at', 'DESC')->get();
        endif;
        
        return response()->json($bookings);
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'service_id' => 'required|exists:services,id',
            'user_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'start' => 'required',
        ]);
        if(Carbon::parse(Carbon::now()->format('Y-m-d'))->gt(Carbon::parse($request->date))) return abort(403, 'Invalid date.');
        if($request->user_id == Auth::user()->id) return abort(403, 'Action is not allowed.');

        $service = Service::findOrfail($request->service_id);
        $this->authorize('addBooking', $service);
        $timeslots = $service->timeslots($request->date);

        $timeslotAvailable = false;
        foreach($timeslots as $timeslot) :
            if($timeslot['time'] == $request->start) :
                $timeslotAvailable = true;
                break;
            endif;
        endforeach;

        if(!$timeslotAvailable) return abort(403, 'The selected date or time is not anymore available.');

        $data = $request->all();

        $parts = explode(':', $request->start);
        $endTime = Carbon::now();
        $endTime->set('hour', $parts[0]);
        $endTime->set('minute', $parts[1]);
        $endTime->add('minute', $service->duration);
        $data['end'] = $endTime->format('H:i');
        
        $booking = Booking::create($data);
        return response()->json($booking->load('service'));
    }


    public function update($id, Request $request)
    {
        $this->validate($request, [
            'service_id' => 'required|exists:services,id',
            'date' => 'required|date',
            'start' => 'required',
        ]);

        $service = Service::findOrfail($request->service_id);
        $this->authorize('addBooking', $service);

        $booking = Booking::findOrfail($id);
        $this->authorize('update', $booking);

        if(Carbon::parse(Carbon::now()->format('Y-m-d'))->gt(Carbon::parse($request->date))) return abort(403, 'Invalid date.');

        $timeslots = $booking->service->timeslots($request->date);

        $timeslotAvailable = false;
        if($request->date == $booking->date && $request->start == $booking->start) :
            $timeslotAvailable = true;
        else :
            foreach($timeslots as $timeslot) :
                if($timeslot['time'] == $request->start) :
                    $timeslotAvailable = true;
                    break;
                endif;
            endforeach;
        endif;

        if(!$timeslotAvailable) return abort(403, 'The selected date or time is not anymore available.');

        $data = $request->all();

        $parts = explode(':', $request->start);
        $endTime = Carbon::now();
        $endTime->set('hour', $parts[0]);
        $endTime->set('minute', $parts[1]);
        $endTime->add('minute', $booking->service->duration);
        $data['end'] = $endTime->format('H:i');

        $booking->update($data);
        return response()->json($booking->load('service'));
    }

    public function destroy($id)
    {
        $booking = Booking::findOrFail($id);
        $this->authorize('delete', $booking);
        $booking->delete();
        return response()->json(['success' => true]);
    }

}
