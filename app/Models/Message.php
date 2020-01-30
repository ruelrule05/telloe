<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Message extends Model
{
    //
    protected $fillable = ['inquiry_id', 'user_id', 'message', 'type', 'preview'];
    protected $appends = ['timestamp'];

    public function inquiry()
    {
    	return $this->belongsTo(Inquiry::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
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
