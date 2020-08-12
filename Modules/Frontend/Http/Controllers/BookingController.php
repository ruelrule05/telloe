<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\Booking;
use App\Models\Conversation;
use App\Models\Notification;
use Auth;
use Carbon\Carbon;
use Google_Service_Calendar;
use Google_Service_Calendar_Event;
use Modules\Frontend\Http\GoogleCalendarClient;
use Modules\Frontend\Http\OutlookClient;
use Mail;
use Modules\Frontend\Mail\NewBooking;
use Modules\Frontend\Mail\UpdateBooking;
use Modules\Frontend\Mail\DeleteBooking;

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
            'conversation_id' => 'nullable|exists:conversations,id'
        ]);
        $role = Auth::user()->role->role;
        if($request->conversation_id) :
            $conversation = Conversation::findOrFail($request->conversation_id);
            $this->authorize('show', $conversation);
            $bookings = Booking::with('user', 'service')->whereIn('user_id', $conversation->members()->pluck('user_id')->toArray())->whereHas('service', function($service) use ($conversation){
                $service->where('user_id', $conversation->user_id);
            })->orderBy('created_at', 'DESC')->get();
        else:
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
        if(Carbon::now()->gt(Carbon::parse($request->date . ' ' . $request->start))) return abort(403, 'Invalid date.');
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
        $data['user_id'] = ($service->user_id == $request->user_id) ? Auth::user()->id : $data['user_id'];
        
        $booking = Booking::create($data);
        Mail::queue(new NewBooking($booking));

        $user_id = null;
        $description = '';
        $link = '';
        if(Auth::user()->id == $booking->user_id) : // if contact - notify client
            $user_id = $booking->service->user->id;
            $description = "<strong>{$booking->user->full_name}</strong> has placed a booking.";
            $link = "/dashboard/bookings/calendar?date={$booking->date}";
        elseif(Auth::user()->id == $booking->service->user_id) : // if client - notify contact
            $user_id = $booking->user->id;
            $description = "A booking has been placed for your account.";
        endif;

        $notification = Notification::create([
            'user_id' => $user_id,
            'description' => $description,
            'link' => $link
        ]);

        $booking->notification_id = $notification->id;

        return response()->json($booking->load('service'));
    }


    public function update($id, Request $request)
    {
        $this->validate($request, [
            'date' => 'required|date',
            'start' => 'required',
        ]);



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
        Mail::queue(new UpdateBooking($booking));

        $user_id = null;
        $description = '';
        $link = '';
        if(Auth::user()->id == $booking->user_id) : // if contact - notify client
            $user_id = $booking->service->user->id;
            $description = "<strong>{$booking->user->full_name}</strong> has modified their booking.";
            $link = "/dashboard/bookings/calendar?date={$booking->date}";
        elseif(Auth::user()->id == $booking->service->user_id) : // if client - notify contact
            $user_id = $booking->user->id;
            $description = "A booking you made has been modified.";
        endif;

        $notification = Notification::create([
            'user_id' => $user_id,
            'description' => $description,
            'link' => $link
        ]);
        $booking->notification_id = $notification->id;

        return response()->json($booking->load('service.user'));
    }


    public function destroy($id)
    {
        $booking = Booking::with('user', 'service.user')->where('id', $id)->first();
        $this->authorize('delete', $booking);

        Mail::queue(new DeleteBooking($booking->toArray()));
        if(Auth::user()->id == $booking->user_id) : // if contact - notify client
            $user_id = $booking->service->user->id;
            $description = "<strong>{$booking->user->full_name}</strong> has deleted their booking.";
        elseif(Auth::user()->id == $booking->service->user_id) : // if client - notify contact
            $user_id = $booking->user->id;
            $description = "A booking you made has been deleted.";
        endif;
        $notification = Notification::create([
            'user_id' => $user_id,
            'description' => $description,
        ]);
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
                    if(!isset($event->getExtendedProperties()->private['booking'])) $events[] = $event;
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

        $user = Auth::user();
        $user->google_calendar_events = $events;
        $user->save();

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
        $user = Auth::user();
        $user->google_calendars = $calendars;
        $user->save();

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

    public function updateGoogleCalendarEvents(Request $request)
    {
        $this->validate($request, [
            'google_calendar_id' => 'required'
        ]);

        $GoogleCalendarClient = new GoogleCalendarClient();
        $client = $GoogleCalendarClient->client;
        $service = new Google_Service_Calendar($client);

        $events = [];
        $oldCalendarId = Auth::user()->google_calendar_id;
        $calendarId = $request->google_calendar_id;
        $user = Auth::user();
        $user->google_calendar_id = $calendarId;
        $user->save();

        // delete booking events from previous calendar
        if($oldCalendarId) :
            $calendarEvents = $service->events->listEvents($oldCalendarId, ['privateExtendedProperty' => 'booking=yes']);
            while(true) :
                foreach ($calendarEvents->getItems() as $event) :
                    $evId = $event->getId();
                    $service->events->delete($oldCalendarId, $evId);
                endforeach;
                $pageToken = $calendarEvents->getNextPageToken();
                if ($pageToken) :
                    $optParams = array('pageToken' => $pageToken);
                    $calendarEvents = $service->events->listEvents('primary', $optParams);
                else :
                    break;
                endif;
            endwhile;
        endif;


        // delete existing events
        $calendarEvents = $service->events->listEvents($calendarId, ['privateExtendedProperty' => 'booking=yes']);
        while(true) :
            foreach ($calendarEvents->getItems() as $event) :
                $evId = $event->getId();
                $service->events->delete($calendarId, $evId);
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
            $event = new Google_Service_Calendar_Event([
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
                'extendedProperties' => [
                    'private' => [
                        'booking' => 'yes'
                    ]
                ]
            ]);
            $event = $service->events->insert($calendarId, $event);
            $events[] = $event;
        endforeach;
        
        return response()->json($events);
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

    public function outlookClient()
    {
        $OutlookClient = new \Modules\Frontend\Http\OutlookClient();
        return response()->json($OutlookClient->client);
    }


    public function updateOutlookCalendarEvents(Request $request)
    {
        $this->validate($request, [
            'outlook_calendar_id' => 'required'
        ]);
        $extensionName = env('GRAPH_EXTENSION_NAME');

        $OutlookClient = new \Modules\Frontend\Http\OutlookClient();
        $graph = new \Microsoft\Graph\Graph();
        $graph->setAccessToken($OutlookClient->accessToken);

        $events = [];
        $oldCalendarId = Auth::user()->outlook_calendar_id;
        $calendarId = $request->outlook_calendar_id;
        
        $user = Auth::user();
        $user->outlook_calendar_id = $calendarId;
        $user->save();

        // delete booking events from previous calendar
        if($oldCalendarId) :
            //$getOldEventsUrl = "/me/calendars/$oldCalendarId/events?\$filter=extensions/any(f:f/id eq '$extensionName')";
            $getOldEventsUrl = "/me/calendars/$oldCalendarId/events?\$filter=extensions/any(f:f/id eq '$extensionName')";
            $eventsList = $graph->createRequest('GET', $getOldEventsUrl)
              ->setReturnType(\Microsoft\Graph\Model\Event::class)
              ->execute();

            foreach($eventsList as $event) :
               $graph->createRequest('DELETE', "/me/calendars/{$calendarId}/events/{$event->getId()}")->execute();
            endforeach;
        endif;


        // delete existing events
        $getExistingEventsUrl = "/me/calendars/$calendarId/events?\$filter=extensions/any(f:f/id eq '$extensionName')";
        $eventsList = $graph->createRequest('GET', $getExistingEventsUrl)
          ->setReturnType(\Microsoft\Graph\Model\Event::class)
          ->execute();
        foreach($eventsList as $event) :
            $graph->createRequest('DELETE', "/me/calendars/{$calendarId}/events/{$event->getId()}")->execute();
        endforeach;
     

       $bookings = Booking::whereHas('service', function($service) {
            $service->where('user_id', Auth::user()->id);
        })->get();

        foreach($bookings as $booking) :
            $event = [
                'Subject' => $booking->service->name,
                'Body' => [
                    'ContentType' => 'HTML',
                    'Content' => $booking->service->description
                ],
                'Start' => [
                    'DateTime' => Carbon::parse("$booking->date $booking->start")->format('Y-m-d\TH:m:s'),
                    'TimeZone' => $booking->service->user->timezone,
                ],
                'End' => [
                    'DateTime' => Carbon::parse("$booking->date $booking->end")->format('Y-m-d\TH:m:s'),
                    'TimeZone' => $booking->service->user->timezone,
                ],
                'isReminderOn' => false,
                'Attendees' => [
                    ['EmailAddress' => 
                        [
                            'Address' => $booking->user->email,
                            'Name' => $booking->user->full_name,
                        ]
                    ],
                    ['EmailAddress' => 
                        [
                            'Address' => $booking->service->user->email,
                            'Name' => $booking->service->user->full_name,
                        ]
                    ],
                ],
                'Extensions' => [[
                    '@odata.type' => 'microsoft.graph.openTypeExtension',
                    'ExtensionName' => $extensionName
                ]]
            ];
            
            try {
                $event = $graph->createRequest('POST', "/me/calendars/$calendarId/events") 
                    ->attachBody($event)
                    ->setReturnType(\Microsoft\Graph\Model\Event::class)
                    ->execute();
                $events[] = $event;
            } catch (\Exception $e) {
                echo $e->getResponse()->getBody()->getContents();
            }
        endforeach;
        
        return response()->json($events);
    }


    public function outlookCalendarEvents(Request $request)
    {
        $events = [];
        $extensionName = env('GRAPH_EXTENSION_NAME');
        $calendarId = Auth::user()->outlook_calendar_id;
        if($calendarId) :
            $OutlookClient = new \Modules\Frontend\Http\OutlookClient();
            $graph = new \Microsoft\Graph\Graph();
            $graph->setAccessToken($OutlookClient->accessToken);

            $getEventsUrl = "/me/calendars/$calendarId/events";
            try{
                $eventsList = $graph->createRequest('GET', $getEventsUrl)
                    ->setReturnType(\Microsoft\Graph\Model\Event::class)
                    ->execute();
                foreach($eventsList as $event) :
                    $eventExtensionName = '';
                    $getExtensionUrl = "/me/calendars/$calendarId/events/{$event->getId()}/extensions/$extensionName";
                    try{
                        $eventExtension = $graph->createRequest('GET', $getExtensionUrl)
                            ->setReturnType(\Microsoft\Graph\Model\Extension::class)
                            ->execute();
                        $eventExtensionName = $eventExtension->getProperties()['extensionName'];
                    } catch (\Exception $e) {}

                    if($eventExtensionName != $extensionName) $events[] = $event;
                endforeach;
            } catch (\Exception $e) {
                //echo $e->getResponse()->getBody()->getContents();
            }
        endif;

        $user = Auth::user();
        $user->outlook_calendar_events = $events;
        $user->save();
   
        return response()->json($events);
    }

    public function outlookCalendarList(Request $request)
    {
        $calendars = [];
        $OutlookClient = new \Modules\Frontend\Http\OutlookClient();
        $graph = new \Microsoft\Graph\Graph();
        if($OutlookClient->accessToken) :
            $graph->setAccessToken($OutlookClient->accessToken);

            $getCalendarsUrl = '/me/calendars';
            $calendars = $graph->createRequest('GET', $getCalendarsUrl)
              ->setReturnType(\Microsoft\Graph\Model\Calendar::class)
              ->execute();


            $user = Auth::user();
            $user->outlook_calendars = $calendars;
            $user->save();
        endif;

        return response()->json($calendars);
    }

    public function removeCalendar(Request $request)
    {
        $this->validate($request, [
            'calendar' => 'required|in:google,outlook'
        ]);
        $user = Auth::user();

        switch($request->calendar) :
            case 'google':
                $GoogleCalendarClient = new GoogleCalendarClient();
                $client = $GoogleCalendarClient->client;
                $service = new Google_Service_Calendar($client);

                $calendarId = Auth::user()->google_calendar_id;
                // booking events from previous calendar
                if($calendarId) :
                    $calendarEvents = $service->events->listEvents($calendarId, ['privateExtendedProperty' => 'booking=yes']);
                    while(true) :
                        foreach ($calendarEvents->getItems() as $event) :
                            $evId = $event->getId();
                            $service->events->delete($calendarId, $evId);
                        endforeach;
                        $pageToken = $calendarEvents->getNextPageToken();
                        if ($pageToken) :
                            $optParams = array('pageToken' => $pageToken);
                            $calendarEvents = $service->events->listEvents('primary', $optParams);
                        else :
                            break;
                        endif;
                    endwhile;
                endif;

                $user->google_calendar_token = NULL;
                $user->google_calendars = NULL;
                $user->google_calendar_id = NULL;
                $user->google_calendar_events = NULL;
                $user->save();
                break;


            case 'outlook':
                $extensionName = env('GRAPH_EXTENSION_NAME');
                $OutlookClient = new \Modules\Frontend\Http\OutlookClient();
                $graph = new \Microsoft\Graph\Graph();
                $graph->setAccessToken($OutlookClient->accessToken);

                $calendarId = Auth::user()->outlook_calendar_id;
                if($calendarId) :
                    $getOldEventsUrl = "/me/calendars/$calendarId/events?\$filter=extensions/any(f:f/id eq '$extensionName')";
                    $eventsList = $graph->createRequest('GET', $getOldEventsUrl)
                      ->setReturnType(\Microsoft\Graph\Model\Event::class)
                      ->execute();

                    foreach($eventsList as $event) :
                       $graph->createRequest('DELETE', "/me/calendars/{$calendarId}/events/{$event->getId()}")->execute();
                    endforeach;
                endif;

                $user->outlook_token = NULL;
                $user->outlook_calendars = NULL;
                $user->outlook_calendar_id = NULL;
                $user->outlook_calendar_events = NULL;
                $user->save();
                break;
        endswitch;

        return response()->json(['success' => true]);
    }
}
