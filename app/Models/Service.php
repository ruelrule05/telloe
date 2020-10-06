<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends BaseModel
{
    //
    use SoftDeletes;

    protected $fillable = ['user_id', 'member_id', 'name', 'description', 'duration', 'days', 'holidays', 'is_available', 'interval', 'ignored_calendar_events_google', 'is_preset', 'default_rate', 'in_widget', 'assigned_service_id'];
    protected $casts = [
        'days' => 'array',
        'holidays' => 'array',
        'is_available' => 'boolean',
        'ignored_calendar_events_google' => 'array',
        'default_rate' => 'decimal:2',
        'in_widget' => 'boolean'
    ];

    protected $test = [1, 2];

    public static function boot()
    {
        parent::boot();
        static::retrieved(function ($model) {
            if ($model->assigned_service_id) {
                $assignedService = Service::find($model->assigned_service_id);
                if ($assignedService) {
                    $model->name = $assignedService->name;
                    $model->description = $assignedService->description;
                    $model->duration = $assignedService->duration;
                    $model->interval = $assignedService->interval;
                    $model->default_rate = $assignedService->default_rate;
                }
            }
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

    public function assignedService()
    {
        return $this->hasOne(Service::class, 'id', 'assigned_service_id');
    }

    public function timeslots($dateString)
    {
        $timeslots = [];
        $holidays = $this->holidays;

        if (! array_search($dateString, $holidays)) {
            $date = Carbon::parse($dateString);
            $days = json_decode($this->attributes['days'], true);
            $dayName = $date->format('l');

            $day = $days[$dayName];
            if ($day['isOpen']) {
                $timeStart = $date->copy();
                $timeEnd = $date->copy();

                $partsStart = explode(':', $day['start']);
                $timeStart->hour = $partsStart[0];
                $timeStart->minute = $partsStart[1];

                $partsEnd = explode(':', $day['end']);
                $timeEnd->hour = $partsEnd[0];
                $timeEnd->minute = $partsEnd[1];

                $ignoredCalendarEvents = $this->user->ignored_calendar_events;
                $googleEventsList = $this->user->google_calendar_events;
                $outlookEventsList = $this->user->outlook_calendar_events;

                while ($timeStart->lessThan($timeEnd)) {
                    $timeslot = [
                        'label' => $timeStart->format('h:iA'),
                        'time' => $timeStart->format('H:i'),
                    ];
                    $endTime = $timeStart->copy()->add($this->attributes['interval'], 'minute')->format('H:i');
                    $bookings = Booking::whereHas('service', function ($service) {
                        $service->whereHas('user', function ($user) {
                            $user->where('id', $this->user->id);
                        });
                    })
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
                                $start->tz = new \DateTimeZone($this->user->timezone);
                                $start = $start->format('H:i');
                                $end = Carbon::createFromFormat('Y-m-d\TH:i:s.u0', $event['end']['dateTime'], $event['end']['timeZone']);
                                $end->tz = new \DateTimeZone($this->user->timezone);
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
                    if ($bookings->count() == 0 && count($googleEvents) == 0 && count($outlookEvents) == 0 && ! $isBreaktime) {
                        $timeslots[] = $timeslot;
                    }

                    $timeStart->add($this->attributes['duration'] + $this->attributes['interval'], 'minute');
                }
            }
        }

        return $timeslots;
    }
}
