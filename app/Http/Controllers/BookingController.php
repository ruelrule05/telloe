<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssignServiceToMemberRequest;
use App\Http\Requests\DestroyCalendarRequest;
use App\Http\Requests\IndexBookingRequest;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use App\Http\Requests\UpdateOutlookCalendarEventsRequest;
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
        $bookingService = new BookingService();
        return $bookingService->destroy($id);
    }

    public function googleCalendarEvents()
    {
        return BookingService::googleCalendarEvents();
    }

    public function googleCalendarList(Request $request)
    {
        return response(BookingService::googleCalendarList($request));
    }

    public function updateOutlookCalendarEvents(UpdateOutlookCalendarEventsRequest $request)
    {
        return response(BookingService::updateOutlookCalendarEvents($request));
    }

    public function outlookCalendarEvents(Request $request)
    {
        return BookingService::outlookCalendarEvents($request);
    }

    public function outlookCalendarList(Request $request)
    {
        return response(BookingService::outlookCalendarList($request));
    }

    public function removeCalendar(DestroyCalendarRequest $request)
    {
        return response(BookingService::removeCalendar($request));
    }

    public function assignToMember($id, AssignServiceToMemberRequest $request)
    {
        return response(BookingService::assignToMember($id, $request));
    }

    public function downloadIcs(Request $request)
    {
        return response(BookingService::downloadIcs($request));
    }
}
