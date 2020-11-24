<?php

namespace App\Models;

class BookingNote extends BaseModel
{
    protected $fillable = ['booking_id', 'note'];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}
