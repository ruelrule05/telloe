<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;

class Booking extends BaseModel
{
    //
    use SoftDeletes;

    protected $fillable = ['service_id', 'booking_link_id', 'date', 'start', 'end', 'metadata', 'zoom_link', 'notes', 'contact_package_id', 'meeting_type', 'meet_link', 'uuid', 'timezone', 'name', 'form_data'];
    protected $appends = ['is_expired'];
    protected $casts = [
        'metadata' => 'array',
        'notified_2' => 'boolean',
        'notified_24' => 'boolean',
    ];

    public function bookingUsers()
    {
        return $this->hasMany(BookingUser::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function bookingLink()
    {
        return $this->belongsTo(BookingLink::class);
    }

    public function getIsExpiredAttribute()
    {
        return Carbon::now()->isAfter(Carbon::parse($this->attributes['date'] . ' ' . $this->attributes['start']));
    }

    public function bookingNote()
    {
        return $this->hasOne(BookingNote::class)->withDefault([
            'note' => '',
        ]);
    }

    public function contactPackage()
    {
        return $this->belongsTo(ContactPackage::class);
    }
}
