<?php

namespace App\Models;

class BookingUser extends BaseModel
{
    //

    protected $fillable = ['booking_id', 'user_id', 'email', 'guest'];    
    protected $casts = [
        'guest' => 'object',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class)->withDefault($this->attributes['guest'] ?? $this->guest);
    }
}
