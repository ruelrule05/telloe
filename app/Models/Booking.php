<?php

namespace App\Models;
use Carbon\Carbon;

class Booking extends BaseModel
{
    //
    protected $fillable = ['service_id', 'user_id', 'contact_id', 'date', 'start', 'end', 'metadata', 'link'];
    protected $appends = ['is_expired'];
    protected $casts = [
        'metadata' => 'array',
        'notified_2' => 'boolean',
        'notified_24' => 'boolean',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function getIsExpiredAttribute()
    {
        return Carbon::now()->isAfter(Carbon::parse($this->attributes['date'] . ' ' . $this->attributes['start']));
    }

}
