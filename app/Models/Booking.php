<?php

namespace App\Models;

class Booking extends BaseModel
{
    //
    protected $fillable = ['service_id', 'user_id', 'date', 'start', 'end', 'metadata'];
    protected $casts = [
        'metadata' => 'array',
        'notified_2' => 'boolean',
        'notified_24' => 'boolean',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

}
