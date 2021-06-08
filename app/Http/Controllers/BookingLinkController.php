<?php

namespace App\Http\Controllers;

use App\Http\Requests\IndexBookingLinkRequest;
use App\Http\Requests\StoreBookingLinkRequest;
use App\Http\Requests\UpdateBookingLinkRequest;
use App\Services\BookingLinkService;
use Illuminate\Http\Request;

class BookingLinkController extends Controller
{
    public function index(Request $request)
    {
        return response(BookingLinkService::index($request));
    }

    public function store(StoreBookingLinkRequest $request)
    {
        return response(BookingLinkService::store($request));
    }

    public function show($id)
    {
        $bookingLinkService = new BookingLinkService();
        return $bookingLinkService->show($id);
    }

    public function update($id, UpdateBookingLinkRequest $request)
    {
        return BookingLinkService::update($id, $request);
    }

    public function public($uuid, Request $request)
    {
        return response(BookingLinkService::public($uuid, $request));
    }

    public function getAllTimeslots(IndexBookingLinkRequest $request)
    {
        return response(BookingLinkService::getAllTimeslots($request));
    }

    public function sendInvitation($id)
    {
        $bookingLinkService = new BookingLinkService();
        return $bookingLinkService->sendInvitation($id);
    }

    public function destroy($id)
    {
        $bookingLinkService = new BookingLinkService();
        return $bookingLinkService->destroy($id);
    }

    public function book($uuid, Request $request)
    {
        $this->validate($request, [
            'date' => 'required|date',
            'start' => 'required|date_format:H:i',
        ]);
        return BookingLinkService::book($uuid, $request);
    }

    public function message($id, Request $request)
    {
        $this->validate($request, [
            'message' => 'required|string',
            'timestamp' => 'required|numeric',
        ]);
        return BookingLinkService::message($id, $request);
    }

    public function associateUser($uuid)
    {
        return BookingLinkService::associateUser($uuid);
    }
}
