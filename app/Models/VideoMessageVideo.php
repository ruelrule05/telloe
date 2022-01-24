<?php

namespace App\Models;

class VideoMessageVideo extends BaseModel
{
    protected $fillable = ['video_message_id', 'user_video_id', 'order'];

    public function videoMessage()
    {
        return $this->belongsTo(VideoMessage::class);
    }

    public function userVideo()
    {
        return $this->belongsTo(UserVideo::class);
    }
}
