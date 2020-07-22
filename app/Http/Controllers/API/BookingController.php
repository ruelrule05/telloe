<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Offer;
use App\Models\Conversation;
use App\Models\Booking;
use DB;
use Carbon\Carbon;

class BookingController extends Controller
{
    public function __construct()
    {
        auth()->setDefaultDriver('api');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'conversation_id' => 'required|exists:conversations,id',
            'date' => 'required|date',
            'time' => 'required',
        ]);
        $widget = Conversation::findOrFail($request->conversation_id)->widget;

        $metadata = null;
        if ($request->wp_post) :
            $metadata['wp_post_id'] = $request->wp_post->ID;
            $metadata['wp_user_id'] = $request->wp_post->post_author;
        endif;


        // check if date is not less than today
        $now = Carbon::now();
        $parsedDate = Carbon::parse($request->date . ' ' . $request->time['open']);
        if ($parsedDate < $now) return abort(403, 'Selected date is not anymore available.');

        // check if timeslot is available
        $isBooked = Booking::where('date', $request->date)->where('start', $request->time['open'])->first();
        if ($isBooked) return abort(403, 'Selected timeslot is not anymore available.');

        $booking = Booking::create([
            'widget_id' => $widget->id,
            'user_id' => auth()->user()->id,
            'date' => $request->date,
            'start' => $request->time['open'],
            'end' => $request->time['close'],
            'metadata' => $metadata
        ]);

        return response()->json($booking);

    }

}
