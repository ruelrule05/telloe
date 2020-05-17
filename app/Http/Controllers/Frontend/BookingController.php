<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Booking;
use Auth;
use Carbon\Carbon;

class BookingController extends Controller
{

	public function index(Request $request)
    {
    	$this->validate($request, [
    		'user_id' => 'required|exists:users,id'
    	]);
        $bookings = Booking::where('user_id', $request->user_id)->where('widget_id', Auth::user()->widget->id)->orderBy('created_at', 'DESC')->get();
        return response()->json($bookings);
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'start' => 'required',
            'end' => 'required',
        ]);
        if($request->start > $request->end || $request->start == $request->end) return abort(403, 'Invalid start and/or end time.');
        if(Carbon::parse(Carbon::now()->format('Y-m-d'))->gt(Carbon::parse($request->date))) return abort(403, 'Invalid date.');

        $data = $request->all();
        $data['widget_id'] = Auth::user()->widget->id;
        $booking = Booking::create($data);
        return response()->json($booking);
    }


    public function update($id, Request $request)
    {
        $this->validate($request, [
            'date' => 'required|date',
            'start' => 'required',
            'end' => 'required',
        ]);
        $booking = Booking::findOrfail($id);
        $this->authorize('update', $booking);

        if($request->start > $request->end || $request->start == $request->end) return abort(403, 'Invalid start and/or end time.');
        if(Carbon::parse(Carbon::now()->format('Y-m-d'))->gt(Carbon::parse($request->date))) return abort(403, 'Invalid date.');

        $booking->update($request->all());
        return response()->json($booking);
    }

    public function destroy($id)
    {
        $booking = Booking::findOrFail($id);
        $this->authorize('delete', $booking);
        $booking->delete();
        return response()->json(['success' => true]);
    }

}
