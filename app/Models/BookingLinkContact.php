<?php

namespace App\Models;

class BookingLinkContact extends BaseModel
{
    //

    protected $fillable = ['contact_id', 'booking_link_id', 'color'];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function bookingLink()
    {
        return $this->belongsTo(BookingLink::class);
    }
}
