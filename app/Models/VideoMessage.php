<?php

namespace App\Models;

class VideoMessage extends BaseModel
{
    protected $fillable = ['uuid', 'user_id', 'title', 'description', 'initial_message', 'service_id', 'views'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function videos()
    {
        return $this->hasMany(VideoMessageVideo::class)->orderBy('order', 'ASC');
    }
}
