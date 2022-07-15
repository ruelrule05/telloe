<?php

namespace App\Models;

class VideoCampaignVideo extends BaseModel
{
    protected $fillable = ['video_campaign_id', 'user_video_id', 'order'];

    public function videoCampaign()
    {
        return $this->belongsTo(VideoCampaign::class);
    }

    public function userVideo()
    {
        return $this->belongsTo(UserVideo::class);
    }
}
