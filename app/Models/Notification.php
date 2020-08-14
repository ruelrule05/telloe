<?php

namespace App\Models;
use Carbon\Carbon;

class Notification extends BaseModel
{
    //
    protected $fillable = ['user_id', 'description', 'link', 'is_read'];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }


    public function getCreatedAtAttribute($value)
    {
        $created_diff = Carbon::parse($value)->diffForHumans(null, true);
        return str_replace(['hour', 'hours', 'minute', 'minutes'], ['hr', 'hrs', 'min', 'mins'], $created_diff) . ' ago';
    }


}