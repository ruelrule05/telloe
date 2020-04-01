<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Message extends Model
{
    //
    protected $fillable = ['conversation_id', 'user_id', 'message', 'type', 'source', 'preview', 'metadata', 'is_read', 'timestamp'];
    protected $appends = ['user'];
    protected $casts = [
        'metadata' => 'array',
        'is_read' => 'boolean',
    ];

    public function conversation()
    {
    	return $this->belongsTo(Conversation::class);
    }

    /*public function user()
    {
        return $this->belongsTo(User::class) ?? ['dwa'];
    }*/

    public function getCreatedAtAttribute($value)
    {
    	return Carbon::parse($value)->format('h:iA \\o\\n D');
    }

    public function getSourceAttribute($value)
    {
        return $value ? config('app.url') . $value : false;
    }

    public function getPreviewAttribute($value)
    {
        return $value ? config('app.url') . $value : false;
    }

    public function getUserAttribute()
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
    }
}
