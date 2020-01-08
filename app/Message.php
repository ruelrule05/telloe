<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Message extends Model
{
    //
    protected $fillable = ['inquiry_id', 'message', 'type', 'sender', 'preview'];
    protected $appends = ['timestamp'];

    public function inquiry()
    {
    	return $this->belongsTo(Inquiry::class);
    }


    public function getCreatedAtAttribute($value)
    {
    	return Carbon::parse($value)->format('h:iA \\o\\n D');
    }

     public function getTimestampAttribute($value)
    {
        return Carbon::parse($this->attributes['created_at'])->timestamp;
    }
}
