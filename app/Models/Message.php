<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Message extends Model
{
    //
    protected $fillable = ['convo_id', 'user_id', 'message', 'type', 'source', 'preview', 'metadata'];
    protected $appends = ['timestamp'];
    protected $casts = [
        'metadata' => 'array',
    ];

    public function convo()
    {
    	return $this->belongsTo(Convo::class);
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

    public function getSourceAttribute($value)
    {
        return config('app.url') . $value;
    }

    public function getPreviewAttribute($value)
    {
        return config('app.url') . $value;
    }
}
