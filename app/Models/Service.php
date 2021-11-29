<?php

namespace App\Models;

use Cache;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends BaseModel
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['user_id', 'member_id', 'name', 'description', 'duration', 'days', 'holidays', 'is_available', 'interval', 'ignored_calendar_events_google', 'is_preset', 'default_rate', 'in_widget', 'parent_service_id', 'manage_bookings', 'address', 'ask_skype', 'require_skype', 'ask_phone', 'require_phone', 'create_zoom_link', 'currency', 'require_payment', 'types', 'starts_at', 'ends_at', 'timezone', 'type', 'form_builder'];

    protected $casts = [
        'days' => 'array',
        'holidays' => 'array',
        'is_available' => 'boolean',
        'ignored_calendar_events_google' => 'array',
        'default_rate' => 'decimal:2',
        'in_widget' => 'boolean',
        'manage_bookings' => 'boolean',
        'ask_skype' => 'boolean',
        'require_skype' => 'boolean',
        'ask_phone' => 'boolean',
        'require_phone' => 'boolean',
        'create_zoom_link' => 'boolean',
        'require_payment' => 'boolean',
        'types' => 'array',
    ];

    protected $appends = ['coach'];

    public function getCoachAttribute()
    {
        return $this->user ?? $this->member->memberUser ?? $this->member;
    }

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
                    if (! $model->member) {
                        $model->member = ['memberUser' => $model->member];
                    }
                }
            }
        });
        static::restoring(function ($model) {
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
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
        return $this->hasMany(Service::class, 'parent_service_id', 'id')->where(function ($query) {
            $query->has('user')->orHas('member');
        });
    }

    public function parentService()
    {
        return $this->belongsTo(Service::class, 'parent_service_id', 'id');
    }

    public function timeslots($dateString)
    {
        $timeslots = [];
        $holidays = $this->holidays;
        $user = User::findOrFail($this->user_id);

        $serviceBookings = Booking::with('bookingNote', 'bookingUsers', 'service.user')
        ->where('service_id', $this->attributes['id'])
        ->where(function ($query) use ($dateString) {
            $query->where('date', $dateString)->orWhere(function ($q) use ($dateString) {
                $q->where('date', '>=', $dateString)->whereNotNull('recurring_end')->where('recurring_end', '<=', $dateString);
            });
        })
        ->get();
        $serviceBookings = collect(self::getRecurringBookings($serviceBookings));

        $date = Carbon::parse($dateString, $this->timezone);
        $dayName = $date->format('l');
        $days = json_decode($this->attributes['days'], true);

        $day = $days[$dayName];
        $timeStart = Carbon::parse($dateString . ' ' . $day['start'], $this->timezone);
        $timeEnd = Carbon::parse($dateString . ' ' . $day['end'], $this->timezone);

        $googleCalendarEvents = $user->google_calendar_events ?? [];
        $googleEventsList = Cache::get("{$user->id}_google_calendar_events", []);

        $outlookCalendarEvents = $user->outlook_calendar_events ?? [];
        $outlookEventsList = Cache::get("{$user->id}_outlook_calendar_events", []);

        $now = Carbon::now();
        while ($timeStart->lessThan($timeEnd)) {
            $timeslotBlocked = false;
            $timeslot = [
                'label' => $timeStart->format('h:iA'),
                'time' => $timeStart->format('H:i'),
                'is_available' => false,
                'is_booked' => false,
            ];
            foreach ($user->blocked_timeslots ?? [] as $blockedTimeslot) {
                $blockedStart = Carbon::parse($blockedTimeslot['start']);
                $blockedEnd = Carbon::parse($blockedTimeslot['end']);
                if ($blockedStart->lessThanOrEqualTo($timeStart) && $blockedEnd->greaterThanOrEqualTo($timeStart)) {
                    $timeslotBlocked = true;
                    break;
                }
            }
            $bookings = $serviceBookings->filter(function ($booking) use ($timeslot, $timeStart) {
                $start = Carbon::parse($booking->date . ' ' . $booking->start, $booking->timezone)->setTimezone($this->timezone)->format('H:i');
                $end = Carbon::parse($booking->date . ' ' . $booking->end, $booking->timezone)->setTimezone($this->timezone)->format('H:i');
                $timeslotTime = Carbon::parse($timeStart->format('Y-m-d') . ' ' . $timeslot['time'], $booking->timezone)->setTimezone($this->timezone)->format('H:i');
                return $start <= $timeslotTime && $end >= $timeslotTime;
            })
            ->all();

            $timeslot['bookingsCount'] = count($bookings);

            // google calendar events
            $googleEvents = [];
            foreach ($googleEventsList as $event) {
                $eventDate = $event['start']['date'] ?? Carbon::parse($event['start']['dateTime'])->format('Y-m-d');
                if ($eventDate == $dateString) {
                    if (! in_array($event['id'], $googleCalendarEvents)) {
                        $start = $event['start']['date'] ?? Carbon::parse($event['start']['dateTime'], $event['start']['timeZone'])->setTimezone($this->timezone)->format('H:i');
                        $end = $event['end']['date'] ?? Carbon::parse($event['end']['dateTime'], $event['end']['timeZone'])->setTimezone($this->timezone)->format('H:i');
                        if ($start <= $timeslot['time'] && $end >= $timeslot['time']) {
                            $googleEvents[] = $event;
                        }
                    }
                }
            }

            // outlook calendar events
            $outlookEvents = [];
            foreach ($outlookEventsList as $event) {
                $event = json_decode(json_encode($event));
                $eventDate = Carbon::parse($event->start->dateTime, $event->start->timeZone)->setTimezone($this->timezone)->format('Y-m-d');
                if ($eventDate == $dateString) {
                    if (! in_array($event->id, $outlookCalendarEvents)) {
                        $start = Carbon::parse($event->start->dateTime, $event->start->timeZone)->setTimezone($this->timezone)->format('H:i');
                        $end = Carbon::parse($event->end->dateTime, $event->end->timeZone)->setTimezone($this->timezone)->format('H:i');
                        if ($start <= $timeslot['time'] && $end >= $timeslot['time']) {
                            $outlookEvents[] = $event;
                        }
                    }
                }
            }

            $isBreaktime = false;
            if (isset($this->days[$dayName]['breaktimes']) && is_array($this->days[$dayName]['breaktimes'])) {
                foreach ($this->days[$dayName]['breaktimes'] as $breaktime) {
                    if (isset($breaktime['start']) && $breaktime['start'] && isset($breaktime['end']) && $breaktime['end']) {
                        $start = str_replace(':', '', $breaktime['start']);
                        $end = str_replace(':', '', $breaktime['end']);
                        $time = str_replace(':', '', $timeslot['time']);
                        if ($time >= $start && $time <= $end) {
                            $isBreaktime = true;
                        }
                    }
                }
            }
            if ($day['isOpen'] && $timeStart->greaterThanOrEqualTo($now) && count($bookings) == 0 && count($googleEvents) == 0 && count($outlookEvents) == 0 && ! $isBreaktime && ! in_array($dateString, $holidays) && ! $timeslotBlocked) {
                $timeslot['is_available'] = true;
            } elseif (count($bookings) > 0) {
                $timeslot['bookings'] = $bookings;
                $timeslot['is_booked'] = true;
            } elseif ($timeslotBlocked) {
                $timeslot['is_blocked'] = true;
            }
            $timeslots[] = $timeslot;
            $timeStart->add($this->attributes['interval'] + $this->attributes['duration'], 'minute');
        }

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
            ->with('user', 'service.user', 'service.member.memberUser')
            ->paginate(15, ['*'], 'page', $page);
        return $bookings;

        $bookings = $this->bookings()->where(function ($query) {
            $query->whereNotNull('user_id')->orWhereNotNull('contact_id');
        })->get()->load(['bookingUsers', 'service.user', 'service.member.memberUser'])->toArray();
        $assignedServices = $this->assignedServices()->where('parent_service_id', '<>', $this->attributes['id'])->withTrashed()->get();
        $assignedServices->map(function ($assignedService) use (&$bookings) {
            $assignedServiceBookings = $assignedService->bookings()->where(function ($query) {
                $query->whereNotNull('user_id')->orWhereNotNull('contact_id');
            })->get();
            if ($assignedServiceBookings->count() > 0) {
                $bookings = array_merge($bookings, $assignedServiceBookings->load(['bookingUsers', 'service.user', 'service.member.memberUser', 'service' => function ($service) {
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

    public function getTimezoneAttribute($value)
    {
        return $value ?? $this->coach->timezone;
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
