<?php

namespace App\Models;

use Carbon\Carbon;

class Note extends BaseModel
{
    //
    protected $fillable = ['conversation_id', 'user_id', 'notes', 'tags'];
    protected $appends = ['created_at_format'];
    protected $casts = [
        'tags' => 'array',
    ];
    public function conversation()
    {
    	return $this->belongsTo(Conversation::class);
    }


    public function getCreatedAtFormatAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->format('h:iA \\o\\n D');
    }
}
