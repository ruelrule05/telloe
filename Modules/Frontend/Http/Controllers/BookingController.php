<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Booking;
use Auth;
use Carbon\Carbon;
use Google_Service_Calendar;
use Google_Service_Calendar_Event;
use Modules\Frontend\Http\GoogleCalendarClient;
use Modules\Frontend\Http\OutlookClient;

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


    public function googleClient()
    {
        $GoogleCalendarClient = new GoogleCalendarClient();
        return response()->json($GoogleCalendarClient->client);
    }

    public function googleCalendarEvents()
    {
        $events = [];
        $calendarId = Auth::user()->google_calendar_id;
        if($calendarId) :
            $GoogleCalendarClient = new GoogleCalendarClient();
            $client = $GoogleCalendarClient->client;
            $service = new Google_Service_Calendar($client);
            $eventsList = $service->events->listEvents($calendarId);
            while(true) :
                foreach ($eventsList->getItems() as $event) :
                    $evId = $event->getId();
                    if (strpos($evId, 'booking') === false) :
                        $events[] = $event;
                    endif;
                endforeach;
                $pageToken = $eventsList->getNextPageToken();
                if ($pageToken) :
                    $optParams = array('pageToken' => $pageToken);
                    $eventsList = $service->events->listEvents($calendarId, $optParams);
                else :
                    break;
                endif;
            endwhile;
        endif;

        Auth::user()->update([
            'google_calendar_events' => $events
        ]);

        return response()->json($events);
    }

    public function googleCalendarList(Request $request)
    {
        $GoogleCalendarClient = new GoogleCalendarClient();
        $calendars = [];
        if(!isset($GoogleCalendarClient->client->authUrl)) :
            $client = $GoogleCalendarClient->client;
            $service = new Google_Service_Calendar($client);

            $calendarList = $service->calendarList->listCalendarList([
                'showHidden' => true,
                'showDeleted' => true,
            ]);
            while(true) :
                foreach ($calendarList->getItems() as $calendarListEntry) :
                    $calendars[] = $calendarListEntry;
                endforeach;
                $pageToken = $calendarList->getNextPageToken();
                if ($pageToken) :
                    $optParams = array('pageToken' => $pageToken);
                    $calendarList = $service->calendarList->listCalendarList($optParams);
                else :
                    break;
                endif;
            endwhile;

            usort($calendars, function($a, $b) {
                return strcmp($a->summary, $b->summary);
            });
        endif;
        return response()->json($calendars);
    }


    public function googleCalendarCallback(Request $request)
    {
        $GoogleCalendarClient = new GoogleCalendarClient();
        $GoogleCalendarClient->setAccessToken($request->code);
        echo "
            <script>
                window.code = '{$request->code}';
                window.close();
            </script>"
        ;

        return;
    }

    public function updateGoogleCalendarEvents()
    {
        $events = [];
        $calendarId = Auth::user()->google_calendar_id;
        $timestamp = time();
        if($calendarId) :
            $GoogleCalendarClient = new GoogleCalendarClient();
            $client = $GoogleCalendarClient->client;
            $service = new Google_Service_Calendar($client);

            // delete existing events with ID contains "booking"
            $calendarEvents = $service->events->listEvents($calendarId);
            while(true) :
                foreach ($calendarEvents->getItems() as $event) :
                    $evId = $event->getId();
                    if (strpos($evId, 'booking') !== false) :
                        $service->events->delete($calendarId, $evId);
                    endif;
                endforeach;
                $pageToken = $calendarEvents->getNextPageToken();
                if ($pageToken) :
                    $optParams = array('pageToken' => $pageToken);
                    $calendarEvents = $service->events->listEvents('primary', $optParams);
                else :
                    break;
                endif;
            endwhile;

            $bookings = Booking::whereHas('service', function($service) {
                $service->where('user_id', Auth::user()->id);
            })->get();


            foreach($bookings as $booking) :
                $eventId = "{$timestamp}booking{$booking->id}";
                $event = new Google_Service_Calendar_Event([
                    'id' => $eventId,
                    'summary' => $booking->service->name,
                    'description' => $booking->service->description,
                    'start' => [
                        'dateTime' => Carbon::parse("$booking->date $booking->start")->toRfc3339String(),
                        'timeZone' => $booking->service->user->timezone,
                    ],
                    'end' => [
                        'dateTime' => Carbon::parse("$booking->date $booking->end")->toRfc3339String(),
                        'timeZone' => $booking->service->user->timezone,
                    ],
                    'attendees' => [
                        array('email' => $booking->user->email),
                        array('email' => $booking->service->user->email),
                    ],
                ]);
                $event = $service->events->insert($calendarId, $event);
                $events[] = $event;
            endforeach;
            
            return response()->json($events);
        endif;
    }

    public function msOutlookCallback(Request $request)
    {
        $OutlookClient = new \Modules\Frontend\Http\OutlookClient();
        $user = $OutlookClient->callback($request);

        echo "
            <script>
                window.close();
            </script>"
        ;

        return;
    }

    public function outlookCalendarList(Request $request)
    {
        $authTokens = Auth::user()->outlook_token;
        $OutlookClient = new \Modules\Frontend\Http\OutlookClient();
        $graph = new \Microsoft\Graph\Graph();
        $graph->setAccessToken($authTokens['accessToken']);

        $getCalendarsUrl = '/me/calendars';
        $calendars = $graph->createRequest('GET', $getCalendarsUrl)
          ->setReturnType(\Microsoft\Graph\Model\Calendar::class)
          ->execute();

          return response()->json($calendars);
    }
}
