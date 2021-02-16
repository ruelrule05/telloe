<?php

namespace App\Services;

use App\Http\Requests\IndexBookingLinkRequest;
use App\Models\BookingLink;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class BookingLinkService
{
    public static function index(Request $request)
    {
        {
            if ($request->paginate) {
                $bookingLinks = Auth::user()->bookingLinks()->withCount('bookingLinkContacts')->paginate(20);
            } else {
                $bookingLinks = Auth::user()->bookingLinks()->withCount('bookingLinkContacts')->get();
            }

            return $bookingLinks;
        }
    }

    public static function show($id)
    {
        return ;
    }

    public static function store(Request $request)
    {
        return ;
    }

    public static function update($id, Request $request)
    {
        return ;
    }

    public static function getAllTimeslots(IndexBookingLinkRequest $request)
    {
        $allTimeslots = [];
        $services = Auth::user()->services()->where('is_available', true)->get();
        foreach ($services as $service) {
            $serviceTimeslots = $service->timeslots($request->date);
            foreach ($serviceTimeslots as $serviceTimeslot) {
                if (! isset($allTimeslots[$serviceTimeslot['label']]) || ! $serviceTimeslot['is_available']) {
                    $allTimeslots[$serviceTimeslot['label']] = $serviceTimeslot;
                }
            }
        }

        $timeslots = [];
        foreach ($allTimeslots as $key => $timeslot) {
            $timeslots[] = $timeslot;
        }

        return $timeslots;
    }

    public static function public($uuid, Request $request)
    {
        $bookingLink = BookingLink::where('uuid', $uuid)->with('bookingLinkContacts.contact.contactUser')->firstOrFail();
        $user = Auth::user();
        $email = $user->email ?? $request->email;
        $bookingLinkContact = false;
        if ($user) {
            $bookingLinkContact = $bookingLink->whereHas('bookingLinkContacts', function ($bookingLinkContact) use ($user) {
                $bookingLinkContact->whereHas('contact', function ($contact) use ($user) {
                    $contact->where('contact_user_id', $user->id);
                });
            })->exists();
        }
        $inEmails = in_array($email, Arr::pluck($bookingLink->emails, 'email'));
        if ($email == $bookingLink->user->email || $inEmails || $bookingLinkContact) {
            return view('booking-link', compact('bookingLink', 'user', 'inEmails'));
        }
        return abort(403);
    }

    public static function delete($id)
    {
        return ;
    }
}
