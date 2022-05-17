<?php

namespace App\Models;

class VideoCampaign extends BaseModel
{
    protected $fillable = ['user_id', 'name', 'title', 'description', 'initial_message', 'service_id', 'link_preview', 'contact_tags', 'email_template'];
    protected $casts = [
        'contact_tags' => 'array',
        'initial_message' => 'object'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function videoCampaignVideos()
    {
        return $this->hasMany(VideoCampaignVideo::class)->orderBy('order', 'ASC');
    }
    public function videoMessages()
    {
        return $this->hasMany(VideoMessage::class)->latest('created_at');
    }
}
