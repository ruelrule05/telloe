<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BookingLink;
use App\Models\BookingLinkContact;
use App\Models\Contact;
use Auth;
use Illuminate\Http\Request;
use Webpatser\Uuid\Uuid;

class BookingLinkController extends Controller
{
    public function index(Request $request)
    {
        if ($request->paginate) {
            $bookingLinks = Auth::user()->bookingLinks()->withCount('bookingLinkContacts')->paginate(20);
        } else {
            $bookingLinks = Auth::user()->bookingLinks()->withCount('bookingLinkContacts')->get();
        }

        return response()->json($bookingLinks);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:50',
            'contacts' => 'required|array',
            'dates' => 'required|array',
        ]);

        $contacts = [];
        foreach ($request->contacts as $contactId) {
            $contact = Contact::findOrFail($contactId);
            $this->authorize('show', $contact);
            $contacts[] = $contact;
        }

        $bookingLink = BookingLink::create([
            'name' => $request->name,
            'user_id' => Auth::user()->id,
            'dates' => $request->dates,
            'uuid' => Uuid::generate()
        ]);

        foreach ($contacts as $contact) {
            BookingLinkContact::create([
                'contact_id' => $contact->id,
                'booking_link_id' => $bookingLink->id
            ]);
        }

        return response($bookingLink->fresh());
    }

    public function show($id)
    {
        $bookingLink = BookingLink::findOrFail($id);
        $this->authorize('show', $bookingLink);
        return response($bookingLink->load('bookingLinkContacts.contact.contactUser'));
    }

    public function public($uuid)
    {
        $bookingLink = BookingLink::where('uuid', $uuid)->with('bookingLinkContacts.contact.contactUser')->firstOrFail();
        $this->authorize('show', $bookingLink);
        $user = Auth::user();
        return view('frontend::booking-link', compact('bookingLink', 'user'));
    }

    public function getAllTimeslots(Request $request)
    {
        $this->validate($request, [
            'date' => 'required|date'
        ]);

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

        return response($timeslots);
    }
}
