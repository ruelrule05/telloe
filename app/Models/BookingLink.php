<?php

namespace App\Models;

class BookingLink extends BaseModel
{
    //

    protected $fillable = ['name', 'user_id', 'dates', 'uuid', 'emails', 'duration', 'is_booked', 'selected_timeslots', 'message'];
    protected $casts = [
        'dates' => 'array',
        'emails' => 'array',
        'is_booked' => 'boolean',
        'selected_timeslots' => 'object'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bookingLinkContacts()
    {
        return $this->hasMany(BookingLinkContact::class);
    }

    public function bookingLinkMessages()
    {
        return $this->hasMany(BookingLinkMessage::class);
    }
}
