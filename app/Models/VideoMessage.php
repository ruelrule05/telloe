<?php

namespace App\Models;

class VideoMessage extends BaseModel
{
    protected $fillable = ['uuid', 'user_id', 'title', 'description', 'initial_message', 'service_id', 'views', 'is_active', 'link_preview', 'contact_id'];
    protected $casts = [
        'is_active' => 'boolean',
        'initial_message' => 'object'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function videos()
    {
        return $this->hasMany(VideoMessageVideo::class)->orderBy('order', 'ASC');
    }

    public function conversation()
    {
        return $this->hasOne(Conversation::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function videoMessageLikes()
    {
        return $this->hasMany(VideoMessageLike::class);
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
}
