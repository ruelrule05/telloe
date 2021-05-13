<?php

namespace App\Models;

use Carbon\Carbon;

class BookingLinkMessage extends BaseModel
{
    //

    protected $fillable = ['booking_link_id', 'user_id', 'message', 'type', 'link_preview', 'is_read', 'timestamp'];
    protected $appends = ['created_diff'];

    protected $casts = [
        'metadata' => 'array',
    ];

    public function bookingLink()
    {
        return $this->belongsTo(BookingLink::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getCreatedAtFormatAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->format('h:iA \\o\\n D');
    }

    public function getCreatedDiffAttribute()
    {
        $created_diff = Carbon::parse($this->attributes['created_at'])->diffForHumans(null, true);
        return str_replace(['hour', 'hours', 'minute', 'minutes'], ['hr', 'hrs', 'min', 'mins'], $created_diff);
    }

    public function getTimestampAttribute($value)
    {
        return strlen($value) > 0 ? $value : Carbon::parse($this->attributes['created_at'])->getPreciseTimestamp(3);
    }

    /*public function getUserAttribute()
    {
        if($this->attributes['user_id']) :
            $user = User::findOrFail($this->attributes['user_id']);
        else:
            $metadata = json_decode($this->attributes['metadata'], true);
            $is_chatbot = $metadata['is_chatbot'] ?? false;
            $user = [
                'id' => $is_chatbot ? 'chatbot' : $metadata['guest_cookie'] ?? '',
                'full_name' => $is_chatbot ? 'Genie' : $metadata['name'] ?? '',
                'is_chatbot' => $is_chatbot,
                'initials' => $is_chatbot ? '' : 'G',
                'profile_image' => $is_chatbot ? '/images/chatbot.png' : '',
            ];
        endif;

        return $user;
    }*/
}
