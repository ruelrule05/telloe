<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Auth;

class Service extends Model
{
    //
    protected $fillable = ['user_id', 'name', 'description', 'duration', 'days', 'holidays', 'is_available'];
    protected $casts = [
        'days' => 'array',
        'holidays' => 'array',
        'is_available' => 'boolean'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function timeslots($dateString) {
        $timeslots = [];

        $holidays = json_decode($this->attributes['holidays'], true);

        if(!array_search($dateString, $holidays)) :
            $date = Carbon::parse($dateString);
            $days = json_decode($this->attributes['days'], true);

            
            $day = $days[$date->format('l')];
            if($day['isOpen']) :
                $timeStart = $date->copy();
                $timeEnd = $date->copy();

                $partsStart = explode(':', $day['start']);
                $timeStart->hour = $partsStart[0];
                $timeStart->minute = $partsStart[1];

                $partsEnd = explode(':', $day['end']);
                $timeEnd->hour = $partsEnd[0];
                $timeEnd->minute = $partsEnd[1];

                while($timeStart->lessThan($timeEnd)) :
                    $timeslot = [
                        'label' => $timeStart->format('h:iA'),
                        'time' => $timeStart->format('H:i'),
                    ];
                    $endTime = $timeStart->copy()->add(30, 'minute')->format('H:i');
                    $bookings = Booking::whereHas('service', function($service) {
                            $service->whereHas('user', function($user) {
                                $user->where('id', Auth::user()->id);
                            });
                        })
                        ->where('date', $dateString)
                        ->where('start', '<=', $timeslot['time'])
                        ->where('end', '>=', $timeslot['time'])
                        ->get();

                    if($bookings->count() == 0) $timeslots[] = $timeslot;

                    $timeStart->add($this->attributes['duration'] + 30, 'minute');
                endwhile;

            endif;
        endif;

        return $timeslots;
    }
}
