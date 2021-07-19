<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Message extends BaseModel
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['conversation_id', 'user_id', 'message', 'type', 'source', 'link_preview', 'preview', 'metadata', 'is_read', 'timestamp', 'is_history', 'tags'];
    protected $appends = ['created_diff'];

    protected $casts = [
        'metadata' => 'array',
        'is_read' => 'boolean',
        'is_history' => 'boolean',
        'tags' => 'array',
    ];

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /*public function user()
    {
        return $this->belongsTo(User::class) ?? ['dwa'];
    }*/

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
