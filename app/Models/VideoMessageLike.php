<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

class VideoMessageLike extends BaseModel
{
    use SoftDeletes;
    protected $fillable = ['video_message_id', 'user_id', 'is_liked'];

    public function videoMessage()
    {
        return $this->belongsTo(VideoMessage::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
