<?php

namespace App\Services;

use App\Http\GoogleCalendarClient;
use App\Http\Requests\AssignServiceToMemberRequest;
use App\Http\Requests\IndexBookingRequest;
use App\Http\Requests\StoreBookingRequest;
use App\Http\Requests\UpdateBookingRequest;
use App\Mail\DeleteBooking;
use App\Mail\NewBooking;
use App\Mail\UpdateBooking;
use App\Models\Booking;
use App\Models\BookingUser;
use App\Models\Contact;
use App\Models\Notification;
use App\Models\Organization;
use App\Models\Service;
use Auth;
use Carbon\Carbon;
use File;
use Google_Service_Calendar;
use Google_Service_Calendar_Event;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use  Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Spatie\CalendarLinks\Link;
use Webpatser\Uuid\Uuid;

class BookingService
{
    use AuthorizesRequests;

    public static function index(IndexBookingRequest $request)
    {
        $authUser = Auth::user();
        $bookings = [];
        if ($request->organization_id) {
            $organization = Organization::with('members.member.assignedServices')
            ->where('id', $request->organization_id)
            ->where(function ($query) use ($authUser) {
                $query->where('user_id', $authUser->id)->orWhereHas('members.member', function ($member) use ($authUser) {
                    $member->where('member_user_id', $authUser->id);
                });
            })
            ->firstOrFail();
            $memberServiceIds = [];
            $memberServiceParentIds = [];
            foreach ($organization->members as $member) {
                foreach ($member->member->assignedServices as $memberService) {
                    $memberServiceIds[] = $memberService->id;
                    $memberServiceParentIds[] = $memberService->parent_service_id;
                }
            }
            $userServicesIds = Auth::user()->services()->where('is_available', true)->whereIn('id', $memberServiceParentIds)->get()->pluck('id');
            $bookings = Booking::with(['service', 'bookingLink', 'bookingUsers.user'])
                ->whereIn('service_id', $memberServiceIds)
                ->orWhereIn('service_id', $userServicesIds)
                ->has('service');
        } else {
            $bookings = Booking::whereHas('service', function ($service) {
                $service->where('user_id', Auth::user()->id);
            })->orWhereHas('bookingLink', function ($bookingLink) {
                $bookingLink->where('user_id', Auth::user()->id);
            })->has('service')->orHas('bookingLink');
            $bookings = $bookings->with('bookingNote', 'service.assignedServices', 'service.parentService.assignedServices', 'bookingUsers.user', 'bookingLink')->orderBy('date', 'DESC');
        }

        if ($request->date) {
            $bookings = $bookings->where(function ($query) use ($request) {
                $query->where('date', $request->date)->orWhere(function ($q) use ($request) {
                    $q->where('date', '>=', $request->date)->whereNotNull('recurring_end')->where('recurring_end', '<=', $request->date);
                });
            });
        } elseif ($request->from && $request->to) {
            $bookings = $bookings->where(function ($query) use ($request) {
                $query->whereBetween('date', [$request->from, $request->to])->orWhere(function ($q) use ($request) {
                    $q->whereNotNull('recurring_end')->whereBetween('recurring_end', [$request->from, $request->to]);
                });
            });
        }
        if ($request->paginate) {
            $bookings = $bookings->paginate(20);
        } else {
            $bookings = $bookings->get();
        }

        return self::getRecurringBookings($bookings);
    }

    public static function show($uuid)
    {
        $booking = Booking::with('service.user', 'bookingUsers.user')->where('uuid', $uuid)->firstOrFail();
        $from = Carbon::parse("$booking->date $booking->start");
        $to = $from->clone()->addMinute($booking->service->duration);
        $description = $booking->service->description;
        if ($booking->zoom_link) {
            $description .= "\n\nZoom link: " . $booking->zoom_link;
        }
        $link = Link::create($booking->name, $from, $to)
            ->description($description);

        $booking->google_link = $link->google();
        $booking->outlook_link = url('/ics?name=' . $booking->name . '&data=' . $link->ics());
        $booking->yahoo_link = $link->yahoo();
        $booking->ical_link = $booking->outlook_link;

        return view('booking', compact('booking'));
    }

    public static function store(StoreBookingRequest $request)
    {
        if (! isValidTimezone($request->timezone)) {
            return abort(403, 'Invalid timezone');
        }

        if ($request->service_id) {
            $service = Service::findOrFail($request->service_id);
        } else {
            $service = Service::where('type', 'default')->where('user_id', Auth::user()->id)->firstOrFail();
        }
        $data = $request->validated();
        $data['uuid'] = (string) Uuid::generate();
        $data['name'] = $data['name'] ?? $service->name;
        $data['service_id'] = $service->id;
        if ($request->meeting_type == 'Zoom') {
            $types = collect($service->types);
            $type = $types->firstWhere('type', 'Zoom');
            if ($type && $type['data']) {
                $data['zoom_link'] = $type['data'];
            }
        }
        if (isset($request->recurring_end) && isset($request->recurring_frequency) && isset($request->recurring_days)) {
            $data['recurring_end'] = $request->recurring_end;
            $data['recurring_frequency'] = $request->recurring_frequency;
            $data['recurring_days'] = $request->recurring_days;
        }

        $booking = Booking::create($data);
        $from = Carbon::parse("$booking->date $booking->start", $request->timezone);
        $to = $from->clone()->addMinute($booking->service->duration ?? 30);
        $description = $booking->service->description;
        if ($booking->zoom_link) {
            $description .= "\n\nZoom link: " . $booking->zoom_link;
        }
        $link = Link::create($data['name'], $from, $to)
                ->description($description);

        foreach ($data['contact_ids'] as $contactID) {
            $contact = Contact::findOrFail($contactID);
            if (Auth::user()->can('show', $contact)) {
                BookingUser::create([
                    'booking_id' => $booking->id,
                    'user_id' => $contact->contact_user_id,
                    'guest' => [
                        'email' => $contact->email,
                        'first_name' => $contact->first_name,
                        'last_name' => $contact->last_name
                    ]
                ]);
                $attendees[] = ['email' => $contact->contactUser->email];
            }
        }

        $emails = collect($data['emails'])->unique('email');
        foreach ($emails as $emailData) {
            BookingUser::create([
                'booking_id' => $booking->id,
                'user_id' => null,
                'guest' => [
                    'email' => $emailData['email'],
                    'first_name' => $emailData['first_name'],
                    'last_name' => $emailData['last_name'],
                ]
            ]);
            $attendees[] = ['email' => $emailData['email']];
        }

        $time = time();
        // Check if Google Calendar is integrated
        // Create event to selected google calendar with flag to tell it's a telloe booking
        if ($service && $service->coach->google_calendar_token && $service->coach->google_calendar_id) {
            $GoogleCalendarClient = new GoogleCalendarClient($service->coach);
            $client = $GoogleCalendarClient->client;
            $googleService = new Google_Service_Calendar($client);
            $eventData = [
                'id' => 'telloebooking' . $booking->id . $time,
                'summary' => $data['name'],
                'description' => $booking->service->description,
                'start' => [
                    'dateTime' => Carbon::parse("$booking->date $booking->start", $booking->timezone)->toIso8601String(),
                    'timeZone' => $booking->timezone,
                ],
                'end' => [
                    'dateTime' => Carbon::parse("$booking->date $booking->end", $booking->timezone)->toIso8601String(),
                    'timeZone' => $booking->timezone,
                ],
                'attendees' => $attendees,
                'conferenceData' => [
                    'createRequest' => [
                        'requestId' => $time
                    ]
                ]
            ];

            if ($booking->recurring_end && $booking->recurring_frequency && $booking->recurring_days) {
                $days = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
                $frequency = strtoupper($booking->recurring_frequency) . 'LY';
                $date = Carbon::parse($booking->recurring_end)->toIso8601String();
                $date = str_replace(['-', ':', '.'], '', $date);
                $date = explode('+',$date);
                $date = $date[0] . 'Z';
                $byDays = [];
                foreach ($booking->recurring_days as $recurringDay) {
                    $byDays[] = $days[$recurringDay];
                }
                $byDays = implode(',', $byDays);
                $eventData['recurrence'] = ["RRULE:FREQ=$frequency;BYDAY=$byDays;UNTIL=$date"];
            }

            if ($booking->zoom_link) {
                $eventData['description'] .= "\n\nZoom link: " . $booking->zoom_link;
            }
            $event = new Google_Service_Calendar_Event($eventData);

            $params = [];
            if ($booking->meeting_type == 'Google Meet') {
                $params = ['conferenceDataVersion' => 1];
            }
            $googleEvents = [];
            $hangoutLink = null;
            foreach ($service->coach->google_calendar_id as $googleCalendarId) {
                $googleEvent = $googleService->events->insert($googleCalendarId, $event, $params);
                $googleEvents[] = [
                    'calendar_id' => $googleCalendarId,
                    'event_id' => $googleEvent->id
                ];
                if ($booking->meeting_type == 'Google Meet') {
                    $hangoutLink = $googleEvent->hangoutLink;
                }
            }
            $booking->update([
                'google_event_id' => $googleEvents
            ]);

            if ($hangoutLink) {
                $booking->update([
                    'meet_link' => $hangoutLink
                ]);
            }
        }

        // Check if Outlook Calendar is integrated
        if ($service && $service->coach->outlook_token && $service->coach->outlook_calendar_id) {
            $OutlookClient = new \App\Http\OutlookClient();
            $graph = new \Microsoft\Graph\Graph();
            if ($OutlookClient->accessToken) {
                $graph->setAccessToken($OutlookClient->accessToken);
                $outlookAttendees = [];
                foreach ($attendees as $attendee) {
                    $outlookAttendees[] = [
                        'EmailAddress' => [
                            'Address' => $attendee['email'],
                        ]
                    ];
                }
                $eventData = [
                    'Subject' => $booking->name,
                    'Body' => [
                        'ContentType' => 'HTML',
                        'Content' => $booking->service->description
                    ],
                    'Start' => [
                        'DateTime' => Carbon::parse("$booking->date $booking->start", $request->timezone)->format('Y-m-d\TH:i:s'),
                        'TimeZone' => $booking->timezone,
                    ],
                    'End' => [
                        'DateTime' => Carbon::parse("$booking->date $booking->end", $request->timezone)->format('Y-m-d\TH:i:s'),
                        'TimeZone' => $booking->timezone,
                    ],
                    'isReminderOn' => false,
                    'Attendees' => $outlookAttendees,
                    'transactionId' => 'telloebooking' . $booking->id . $time
                ];

                if ($booking->zoom_link) {
                    $eventData['Body']['Content'] .= "\n\nZoom link: " . $booking->zoom_link;
                }

                if ($booking->recurring_end && $booking->recurring_frequency && $booking->recurring_days) {
                    $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                    $byDays = [];
                    foreach ($booking->recurring_days as $recurringDay) {
                        $byDays[] = $days[$recurringDay];
                    }
                    $eventData['Recurrence'] = [
                        'pattern' => [
                            'type' => $booking->recurring_frequency . 'ly',
                            'interval' => 1,
                            'daysOfWeek' => $byDays
                        ],
                        'range' => [
                            'type' => 'endDate',
                            'startDate' => $booking->date,
                            'endDate' => Carbon::parse($booking->recurring_end)->format('Y-m-d'),
                        ]
                    ];
                }

                try {
                    $outlookEvents = [];
                    foreach ($service->coach->outlook_calendar_id as $outlookCalendarId) {
                        $outlookEvent = $graph->createRequest('POST', "/me/calendars/$outlookCalendarId/events") 
                        ->attachBody($eventData)
                        ->setReturnType(\Microsoft\Graph\Model\Event::class)
                        ->execute();
                        $outlookEvents[] = [
                            'calendar_id' => $outlookCalendarId,
                            'event_id' => $outlookEvent->getProperties()['id']
                        ];
                    }
                    $booking->update([
                        'outlook_event_id' => $outlookEvents
                    ]);
                } catch (\Exception $e) {
                }
            }
        }

        $booking->google_link = $link->google();
        $booking->outlook_link = url('/ics?name=' . $data['name'] . '&data=' . $link->ics());
        $booking->yahoo_link = $link->yahoo();
        $booking->ical_link = $booking->outlook_link;
        $booking->load('bookingUsers.user');

        $clonedBooking = clone $booking;
        Mail::queue(new NewBooking([$clonedBooking], 'serviceUser'));

        foreach ($booking->bookingUsers as $bookingUser) {
            if ($bookingUser->user_id) {
                $user_id = $bookingUser->user_id;
                $description = 'A booking has been placed for your account.';
                Notification::create([
                    'user_id' => $user_id,
                    'description' => $description,
                    'link' => "/dashboard/calendar?booking=$booking->id"
                ]);
            }

            $attendeeEmail = $bookingUser->user ? $bookingUser->user->email : (isset($bookingUser->guest['email']) ? $bookingUser->guest['email'] : null);
            if ($attendeeEmail) {
                Mail::queue(new NewBooking([$clonedBooking], 'customer', $attendeeEmail));
            }
        }

        $booking->load('bookingUsers.user');

        return response()->json(self::getRecurringBookings(collect([$booking])));
    }

    public static function update($id, UpdateBookingRequest $request)
    {
        $authUser = Auth::user();
        $booking = Booking::findOrFail($id);
        $service = $booking->service;

        $newService = Service::where('id', $request->service_id)->where(function ($query) use ($request, $authUser) {
            $query->where('user_id', $authUser->id)->orWhereHas('parentService', function ($parentService) use ($authUser) {
                $parentService->where('user_id', $authUser->id);
            });
        })->firstOrFail();

        $data = $request->validated();
        if (isset($request->recurring_frequency) && isset($request->recurring_end) && isset($request->recurring_days)) {
            $data['recurring_end'] = $request->recurring_end;
            $data['recurring_frequency'] = $request->recurring_frequency;
            $data['recurring_days'] = $request->recurring_days;
        }

        $booking->update($data);
        $booking = $booking->fresh();
        $attendees = [];

        // Remove booking users not in array
        $bookingUserIds = BookingUser::whereIn('id', $request->booking_user_ids)->where('booking_id', $booking->id)->get()->pluck('id')->toArray();
        BookingUser::where('booking_id', $booking->id)->whereNotIn('id', $bookingUserIds)->delete();
        $updatedBookingUsers = $booking->fresh()->bookingUsers;
        $newBookingUsers = [];

        foreach ($updatedBookingUsers as $updatedBookingUser) {
            $attendees[] = ['email' => $updatedBookingUser->user->email];
        }

        // Add contact as booking user
        $contacts = Contact::whereIn('id', $request->contact_ids)->where('user_id', $authUser->id)->get();
        foreach ($contacts as $contact) {
            if (Auth::user()->can('show', $contact)) {
                $newBookingUsers[] = BookingUser::create([
                    'booking_id' => $booking->id,
                    'user_id' => $contact->contact_user_id,
                    'guest' => [
                        'email' => $contact->email,
                        'first_name' => $contact->first_name,
                        'last_name' => $contact->last_name
                    ]
                ]);
                $attendees[] = ['email' => $contact->contactUser->email];
            }
        }

        // Add email as booking user
        $emails = collect($request->emails)->unique('email');
        foreach ($emails as $emailData) {
            $newBookingUsers[] = BookingUser::create([
                'booking_id' => $booking->id,
                'user_id' => null,
                'guest' => [
                    'email' => $emailData['email'],
                    'first_name' => $emailData['first_name'],
                    'last_name' => $emailData['last_name'],
                ]
            ]);
            $attendees[] = ['email' => $emailData['email']];
        }

        // Google Calendar
        if ($booking->google_event_id && $service->coach->google_calendar_token && $service->coach->google_calendar_id) {
            $GoogleCalendarClient = new GoogleCalendarClient($service->coach);
            $client = $GoogleCalendarClient->client;
            $googleService = new Google_Service_Calendar($client);

            foreach ($booking->google_event_id as $googleEvent) {
                $event = $googleService->events->get(
                    $googleEvent['calendar_id'],
                    $googleEvent['event_id']);

                if ($event) {
                    try {
                        $event->start = [
                            'dateTime' => Carbon::parse("$booking->date $booking->start", $request->timezone)->toIso8601String(),
                            'timeZone' => $booking->service->timezone,
                        ];
                        $event->end = [
                            'dateTime' => Carbon::parse("$booking->date $booking->end", $request->timezone)->toIso8601String(),
                            'timeZone' => $booking->service->timezone,
                        ];
                        if ($booking->recurring_end && $booking->recurring_frequency && $booking->recurring_days) {
                            $frequency = strtoupper($booking->recurring_frequency) . 'LY';
                            $date = Carbon::parse($booking->recurring_end)->toIso8601String();
                            $date = str_replace(['-', ':', '.'], '', $date);
                            $date = explode('+',$date);
                            $date = $date[0] . 'Z';
                            $days = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
                            $byDays = [];
                            foreach ($booking->recurring_days as $recurringDay) {
                                $byDays[] = $days[$recurringDay];
                            }
                            $byDays = implode(',', $byDays);
                            $event->recurrence = ["RRULE:FREQ=$frequency;BYDAY=$byDays;UNTIL=$date"];
                        }
                        $event->attendees = $attendees;
                        $googleService->events->update(
                            $googleEvent['calendar_id'], 
                            $googleEvent['event_id'], 
                            $event
                        );
                    } catch (\Exception $e) {
                    }
                }
            }
        }

        // Outlook Calendar
        if ($booking->outlook_event_id && $service->coach->outlook_token && $service->coach->outlook_calendar_id) {
            $OutlookClient = new \App\Http\OutlookClient();
            $graph = new \Microsoft\Graph\Graph();
            if ($OutlookClient->accessToken) {
                $graph->setAccessToken($OutlookClient->accessToken);
                $outlookAttendees = [];
                foreach ($attendees as $attendee) {
                    $outlookAttendees[] = [
                        'EmailAddress' => [
                            'Address' => $attendee['email'],
                        ]
                    ];
                }
                $eventData = [
                    'Start' => [
                        'DateTime' => Carbon::parse("$booking->date $booking->start", $request->timezone)->format('Y-m-d\TH:i:s'),
                        'TimeZone' => $booking->timezone,
                    ],
                    'End' => [
                        'DateTime' => Carbon::parse("$booking->date $booking->end", $request->timezone)->format('Y-m-d\TH:i:s'),
                        'TimeZone' => $booking->timezone,
                    ],
                    'Attendees' => $outlookAttendees,
                ];

                try {
                    foreach ($booking->outlook_event_id as $outlookEvent) {
                        $graph->createRequest('PATCH', "/me/calendars/{$outlookEvent['calendar_id']}/events/{$outlookEvent['event_id']}") 
                        ->attachBody($eventData)
                        ->setReturnType(\Microsoft\Graph\Model\Event::class)
                        ->execute();
                    }
                } catch (\Exception $e) {
                }
            }
        }

        try {
            $clonedBooking = clone $booking;
            Mail::queue(new UpdateBooking($clonedBooking, 'serviceUser'));
            // Notify existing booking users
            foreach ($updatedBookingUsers as $bookingUser) {
                if ($bookingUser->user_id) {
                    Notification::create([
                        'user_id' => $bookingUser->user_id,
                        'description' => 'A booking for your account has been modified.',
                        'link' => "/dashboard/calendar?booking=$clonedBooking->id"
                    ]);
                }
                $attendeeEmail = $bookingUser->user ? $bookingUser->user->email : (isset($bookingUser->guest['email']) ? $bookingUser->guest['email'] : null);
                if ($attendeeEmail) {
                    Mail::queue(new UpdateBooking($clonedBooking, 'contact', $attendeeEmail));
                }
            }

            // Notify new booking users
            foreach ($newBookingUsers as $newBookingUser) {
                if ($newBookingUser->user_id) {
                    $user_id = $newBookingUser->user_id;
                    $description = 'A booking has been placed for your account.';
                    Notification::create([
                        'user_id' => $user_id,
                        'description' => $description,
                        'link' => "/dashboard/calendar?booking=$clonedBooking->id"
                    ]);
                }

                $attendeeEmail = $newBookingUser->user ? $newBookingUser->user->email : (isset($newBookingUser->guest['email']) ? $newBookingUser->guest['email'] : null);
                if ($attendeeEmail) {
                    Mail::queue(new NewBooking([$clonedBooking], 'customer', $attendeeEmail));
                }
            }
        } catch (\Exception $e) {
        }
        $booking->load('service.user', 'bookingNote', 'service.parentService.assignedServices', 'service.assignedServices', 'bookingUsers.user');
        return response()->json(self::getRecurringBookings(collect([$booking])));
    }

    public static function destroy($id)
    {
        $booking = Booking::with('service.user', 'service.member.memberUser', 'bookingUsers.user')->where('id', $id)->first();
        (new self)->authorize('delete', $booking);
        $service = $booking->service;
        if ($booking->google_event_id && $service->coach->google_calendar_token && $service->coach->google_calendar_id) {
            $GoogleCalendarClient = new GoogleCalendarClient($service->coach);
            $client = $GoogleCalendarClient->client;
            $googleService = new Google_Service_Calendar($client);
            try {
                foreach ($booking->google_event_id as $googleEvent) {
                    $googleService->events->delete($googleEvent['calendar_id'], $googleEvent['event_id']);
                }
            } catch (\Exception $e) {
            }
        }

        if ($booking->outlook_event_id && $service->coach->outlook_token && $service->coach->outlook_calendar_id) {
            $OutlookClient = new \App\Http\OutlookClient();
            $graph = new \Microsoft\Graph\Graph();
            if ($OutlookClient->accessToken) {
                $graph->setAccessToken($OutlookClient->accessToken);
                try {
                    foreach ($booking->outlook_event_id as $outlookEvent) {
                        $graph->createRequest('DELETE', "/me/calendars/{$outlookEvent['calendar_id']}/events/{$outlookEvent['event_id']}") 
                        ->execute();
                    }
                } catch (\Exception $e) {
                }
            }
        }
        try {
            Mail::to($booking->service->coach->email)->queue(new DeleteBooking($booking));
            foreach ($booking->bookingUsers as $bookingUser) {
                Mail::to($bookingUser->user->email)->queue(new DeleteBooking($booking));
            }
        } catch (\Exception $e) {
            echo $e->getMessage();
        }
        return $booking->delete();
    }

    public static function downloadIcs(Request $request)
    {
        $base_64_ics = base64_decode(substr($request->data, strpos($request->data, ',') + 1));
        $path = storage_path('app/private/var/tmp/' . Carbon::now()->timestamp . '.ics');
        File::put($path, $base_64_ics);
        return response()->download($path, $request->name . '.ics')->deleteFileAfterSend();
    }

    public static function assignToMember($id, AssignServiceToMemberRequest $request)
    {
        $booking = Booking::findOrfail($id);

        $authUser = Auth::user();
        $service = Service::where('id', $request->service_id)->where('user_id', $authUser->id)->first();
        $assignedService = Service::where('id', $request->service_id)->whereHas('parentService', function ($parentService) use ($authUser) {
            $parentService->where('user_id', $authUser->id);
        })->first();

        if (! $service && ! $assignedService) {
            return abort(403);
        }

        $booking->update([
            'service_id' => $service->id ?? $assignedService->id
        ]);

        return $booking;
    }

    public static function upcoming(Request $request)
    {
        $authUser = Auth::user();

        $tomorrow = Carbon::now()->addDay(1)->format('Y-m-d');
        $daysAgo = Carbon::now()->subDays(5)->format('Y-m-d');
        $bookings = [];
        if ($request->organization_id) {
            $organization = Organization::with('members.member.assignedServices')
            ->where('id', $request->organization_id)
            ->where(function ($query) use ($authUser) {
                $query->where('user_id', $authUser->id)->orWhereHas('members.member', function ($member) use ($authUser) {
                    $member->where('member_user_id', $authUser->id);
                });
            })
            ->firstOrFail();
            $memberServiceIds = [];
            foreach ($organization->members as $member) {
                foreach ($member->member->assignedServices as $memberService) {
                    $memberServiceIds[] = $memberService->id;
                }
            }
            $bookings = Booking::with(['service', 'bookingLink', 'bookingUsers.user'])
                ->whereIn('service_id', $memberServiceIds)
                ->has('service')
                ->where(function ($query) use ($daysAgo, $tomorrow) {
                    $query->whereBetween('date', [$daysAgo, $tomorrow])->orWhere(function ($q) use ($daysAgo, $tomorrow) {
                        $q->whereNotNull('recurring_end')->whereBetween('recurring_end', [$daysAgo, $tomorrow]);
                    });
                })
                ->get();
        } else {
            $bookings = Booking::with(['service', 'bookingLink', 'bookingUsers.user'])
                ->whereHas('service', function ($service) use ($authUser) {
                    $service->where('user_id',$authUser->id);
                })
                ->orWhereHas('bookingLink', function ($bookingLink) use ($authUser) {
                    $bookingLink->where('user_id', $authUser->id);
                })
                ->orWhereHas('bookingUsers.user', function ($user) use ($authUser) {
                    $user->where('id', $authUser->id);
                })
                ->has('service')
                ->orHas('bookingLink')
                ->where(function ($query) use ($daysAgo, $tomorrow) {
                    $query->whereBetween('date', [$daysAgo, $tomorrow])->orWhere(function ($q) use ($daysAgo, $tomorrow) {
                        $q->whereNotNull('recurring_end')->whereBetween('recurring_end', [$daysAgo, $tomorrow]);
                    });
                })
                ->get();
        }

        return self::getRecurringBookings($bookings);
    }

    protected static function getRecurringBookings($bookings)
    {
        $bookings->each(function ($booking) use ($bookings) {
            if ($booking->recurring_end && $booking->recurring_frequency && $booking->recurring_days) {
                $days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                $timeslotDayName = Carbon::parse($booking->date, $booking->timezone)->format('l');
                $startDate = Carbon::parse($booking->date, $booking->timezone)->addDay(1);
                $endDate = Carbon::parse($booking->recurring_end, $booking->timezone);

                while ($startDate->lessThan($endDate)) {
                    $createBooking = false;
                    if ($booking->recurring_frequency == 'week') {
                        $dayIndex = array_search($startDate->clone()->format('l'), $days);
                        if (in_array($dayIndex, $booking->recurring_days)) {
                            $createBooking = true;
                        }
                    } elseif ($booking->recurring_frequency == 'month') {
                        $dayName = $startDate->clone()->format('l');
                        if ($dayName == $timeslotDayName && $startDate->clone()->weekOfMonth == 1) {
                            $createBooking = true;
                        }
                    }
                    if ($createBooking) {
                        $clonedBooking = clone $booking;
                        $clonedBooking->date = $startDate->clone()->format('Y-m-d');
                        $bookings->push($clonedBooking);
                    }
                    $startDate->addDay(1);
                }
            }
        });

        return $bookings;
    }
}
