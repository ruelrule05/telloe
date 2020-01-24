<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Offer;
use App\Models\Booking;

class BookingController extends Controller
{
    public function __construct()
    {
        auth()->setDefaultDriver('api');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'offer_id' => 'required|exists:offers,id',
        ]);

        $offer = Offer::findOrFail($request->offer_id);
        $this->authorize('book', $offer);

        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
        ]);

        $customerInfo = NULL;
        if (!$validator->fails()) :
            $customerInfo = $request->only('first_name', 'last_name', 'email', 'phone');
        endif;
        Booking::create([
            'offer_id' => $offer->id,
            'services' => $offer->services,
            'customer_info' => $customerInfo,
        ]);
        $offer->update(['booked' => true]);

        return response()->json($offer->load('member.user'));
    }

}
