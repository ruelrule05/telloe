<?php

namespace App\Models;

class BookingLink extends BaseModel
{
    //

    protected $fillable = ['name', 'user_id', 'dates', 'uuid', 'emails'];
    protected $casts = [
        'dates' => 'array',
        'emails' => 'array',
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
