<?php

namespace App\Models;

class BookingLink extends BaseModel
{
    //

    protected $fillable = ['name', 'user_id', 'date', 'selected_timeslots', 'timeslots', 'uuid'];
    protected $casts = [
        'date' => 'date',
        'selected_timeslots' => 'array',
        'timeslots' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bookingLinkContacts()
    {
        return $this->hasMany(BookingLinkContact::class);
    }
}
