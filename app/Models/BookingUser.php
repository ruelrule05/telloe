<?php

namespace App\Models;

class BookingUser extends BaseModel
{
    //

    protected $fillable = ['booking_id', 'user_id', 'email'];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class)->withTrashed();
    }
}
