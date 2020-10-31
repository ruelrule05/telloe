<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends BaseModel
{
    //
    use SoftDeletes;

    protected $fillable = ['user_id', 'member_id', 'name', 'description', 'duration', 'days', 'holidays', 'is_available', 'interval', 'ignored_calendar_events_google', 'is_preset', 'default_rate', 'in_widget', 'parent_service_id', 'manage_bookings'];
    protected $casts = [
        'days' => 'array',
        'holidays' => 'array',
        'is_available' => 'boolean',
        'ignored_calendar_events_google' => 'array',
        'default_rate' => 'decimal:2',
        'in_widget' => 'boolean',
        'manage_bookings' => 'boolean'
    ];

    protected $test = [1, 2];

    public static function boot()
    {
        parent::boot();
        static::retrieved(function ($model) {
            if ($model->parent_service_id) {
                $assignedService = Service::find($model->parent_service_id);
                if ($assignedService) {
                    $model->name = $assignedService->name;
                    $model->description = $assignedService->description;
                    $model->duration = $assignedService->duration;
                    $model->interval = $assignedService->interval;
                    $model->default_rate = $assignedService->default_rate;
                    $model->user = $model->member->memberUser;
                }
            }
        });
        static::restoring(function ($model) {
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class) ?? $this->member->memberUser;
    }

    public function member()
    {
        return $this->belongsTo(Member::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function assignedServices()
    {
        return $this->hasMany(Service::class, 'parent_service_id', 'id');
    }

    public function parentService()
    {
        return $this->belongsTo(Service::class, 'parent_service_id', 'id');
    }

    public function timeslots($dateString)
    {
        $timeslots = [];
        $holidays = $this->holidays;
        $user = $this->user ?? $this->member->memberUser;

        //if (! array_search($dateString, $holidays) && $user) {
        $date = Carbon::parse($dateString);
        $days = json_decode($this->attributes['days'], true);
        $dayName = $date->format('l');

        $day = $days[$dayName];
        //if ($day['isOpen']) {
        $timeStart = $date->copy();
        $timeEnd = $date->copy();

        $partsStart = explode(':', $day['start']);
        $timeStart->hour = $partsStart[0];
        $timeStart->minute = $partsStart[1];

        $partsEnd = explode(':', $day['end']);
        $timeEnd->hour = $partsEnd[0];
        $timeEnd->minute = $partsEnd[1];

        $ignoredCalendarEvents = $user->ignored_calendar_events;
        $googleEventsList = $user->google_calendar_events;
        $outlookEventsList = $user->outlook_calendar_events;

        $now = Carbon::now();
        while ($timeStart->lessThan($timeEnd)) {
            $timeslot = [
                'label' => $timeStart->format('h:iA'),
                'time' => $timeStart->format('H:i'),
                'is_available' => false
            ];
            $endTime = $timeStart->copy()->add($this->attributes['interval'], 'minute')->format('H:i');
            $bookings = Booking::where('service_id', $this->attributes['id'])
                                ->where('date', $dateString)
                                ->where('start', '<=', $timeslot['time'])
                                ->where('end', '>=', $timeslot['time'])
                                ->get();

            // google calendar events
            $googleEvents = [];
            foreach ($googleEventsList as $event) {
                $eventDate = $event['start']['date'] ?? Carbon::parse($event['start']['dateTime'])->format('Y-m-d');
                if ($eventDate == $dateString) {
                    if (! $event['start']['dateTime'] && ! $event['end']['dateTime'] && ! in_array('google-event-' . $event['id'], $ignoredCalendarEvents)) {
                        $googleEvents[] = $event;
                    } elseif ($event['start']['dateTime'] && $event['end']['dateTime']) {
                        $start = Carbon::parse($event['start']['dateTime'])->format('H:i');
                        $end = Carbon::parse($event['end']['dateTime'])->format('H:i');
                        if ($start <= $timeslot['time'] && $end >= $timeslot['time']) {
                            $googleEvents[] = $event;
                        }
                    }
                }
            }

            // outlook calendar events
            $outlookEvents = [];
            foreach ($outlookEventsList as $event) {
                $eventDate = Carbon::parse($event['start']['dateTime'])->format('Y-m-d');
                if ($eventDate == $dateString) {
                    if ($event['isAllDay'] && ! in_array('outlook-event-' . $event['id'], $ignoredCalendarEvents)) {
                        $outlookEvents[] = $event;
                    } elseif (! $event['isAllDay']) {
                        $start = Carbon::createFromFormat('Y-m-d\TH:i:s.u0', $event['start']['dateTime'], $event['start']['timeZone']);
                        $start->tz = new \DateTimeZone($user->timezone);
                        $start = $start->format('H:i');
                        $end = Carbon::createFromFormat('Y-m-d\TH:i:s.u0', $event['end']['dateTime'], $event['end']['timeZone']);
                        $end->tz = new \DateTimeZone($user->timezone);
                        $end = $end->format('H:i');
                        if ($start <= $timeslot['time'] && $end >= $timeslot['time']) {
                            $outlookEvents[] = $event;
                        }
                    }
                }
            }

            $isBreaktime = false;
            foreach ($this->days[$dayName]['breaktimes'] ?? [] as $breaktime) {
                $start = str_replace(':', '', $breaktime['start']);
                $end = str_replace(':', '', $breaktime['end']);
                $time = str_replace(':', '', $timeslot['time']);
                if ($time >= $start && $time <= $end) {
                    $isBreaktime = true;
                }
            }
            if ($day['isOpen'] && $timeStart->greaterThanOrEqualTo($now) && $bookings->count() == 0 && count($googleEvents) == 0 && count($outlookEvents) == 0 && ! $isBreaktime && !in_array($dateString, $holidays)) {
                $timeslot['is_available'] = true;
            }
            $timeslots[] = $timeslot;
            $timeStart->add($this->attributes['duration'] + $this->attributes['interval'], 'minute');
        }
        //}
        //}

        return $timeslots;
    }

    public function getAllBookingsAttribute()
    {
        $page = request()->input('page');
        $serviceId = $this->attributes['id'];
        $bookings = Booking::whereHas('service', function ($service) use ($serviceId) {
            $service->where('id', $serviceId)->orWhere('parent_service_id', $serviceId)->withTrashed();
        })
            ->where(function ($query) {
                $query->whereNotNull('user_id')->orWhereNotNull('contact_id');
            })
            ->with('user', 'service.user', 'contact.contactUser', 'service.member.memberUser')
            ->paginate(15, ['*'], 'page', $page);
        return $bookings;

        $bookings = $this->bookings()->where(function ($query) {
            $query->whereNotNull('user_id')->orWhereNotNull('contact_id');
        })->get()->load(['user', 'contact.contactUser', 'service.user', 'service.member.memberUser'])->toArray();
        $assignedServices = $this->assignedServices()->where('parent_service_id', '<>', $this->attributes['id'])->withTrashed()->get();
        $assignedServices->map(function ($assignedService) use (&$bookings) {
            $assignedServiceBookings = $assignedService->bookings()->where(function ($query) {
                $query->whereNotNull('user_id')->orWhereNotNull('contact_id');
            })->get();
            if ($assignedServiceBookings->count() > 0) {
                $bookings = array_merge($bookings, $assignedServiceBookings->load(['user', 'contact.contactUser', 'service.user', 'service.member.memberUser', 'service' => function ($service) {
                    $service->withTrashed();
                }])->toArray());
            }
        });
        $bookings = collect($bookings);
        $bookings = $bookings->sortByDesc(function ($booking, $key) {
            return $booking['created_at'];
        });
        $bookings = $bookings->map(function ($booking) {
            if (! isset($booking['service']['user']) && isset($booking['service']['member'])) {
                $booking['service']['user'] = $booking['service']['member'];
            }
            return $booking;
        });
        return $bookings->paginate(5)->values()->all();
    }
}
