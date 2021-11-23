<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssignServiceToMemberRequest;
use App\Http\Requests\IndexBookingRequest;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use App\Services\BookingService;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index(IndexBookingRequest $request)
    {
        return response(BookingService::index($request));
    }

    public function store(StoreBookingRequest $request)
    {
        return BookingService::store($request);
    }

    public function update($id, UpdateBookingRequest $request)
    {
        return BookingService::update($id, $request);
    }

    public function destroy($id)
    {
        return BookingService::destroy($id);
    }

    public function assignToMember($id, AssignServiceToMemberRequest $request)
    {
        return response(BookingService::assignToMember($id, $request));
    }

    public function downloadIcs(Request $request)
    {
        return BookingService::downloadIcs($request);
    }

    public function upcoming(Request $request)
    {
        return BookingService::upcoming($request);
    }

    public function contactBookings()
    {
        return BookingService::contactBookings();
    }

    public function show($uuid)
    {
        return BookingService::show($uuid);
    }
}
