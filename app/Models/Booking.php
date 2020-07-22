<?php

namespace App\Models;

class Booking extends BaseModel
{
    //
    protected $fillable = ['service_id', 'user_id', 'date', 'start', 'end', 'metadata'];
    protected $casts = [
        'metadata' => 'array',
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
