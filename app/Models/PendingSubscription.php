<?php

namespace App\Models;

use Carbon\Carbon;

class PendingSubscription extends BaseModel
{
    //
    protected $fillable = ['user_id', 'contact_id', 'services', 'date', 'recurring_frequency', 'duration', 'duration_frequency', 'amount'];
    protected $appends = ['created'];
    protected $casts = [
        'services' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function getCreatedAtAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->format('M d, Y h:mA');
    }

    public function getCreatedAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->timestamp;
    }
}
