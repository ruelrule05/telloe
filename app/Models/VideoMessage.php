<?php

namespace App\Models;

class VideoMessage extends BaseModel
{
    protected $fillable = ['user_id', 'title', 'description'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function videos()
    {
        return $this->hasMany(VideoMessageVideo::class)->orderBy('order', 'ASC');
    }
}
