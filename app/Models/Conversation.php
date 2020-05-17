<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Auth;

class Conversation extends Model
{
    //
    protected $fillable = ['widget_id', 'user_id', 'metadata', 'source', 'status', 'name', 'tags'];
    public $appends = ['user', 'last_message', 'timestamp'];
    protected $casts = [
        'metadata' => 'array',
        'tags' => 'array',
    ];

    public function widget()
    {
    	return $this->belongsTo(Widget::class);
    }

    public function messages()
    {
    	return $this->hasMany(Message::class);
    }

    public function members()
    {
        return $this->hasMany(ConversationMember::class)->orderBy('created_at', 'DESC');
    }


    public function notes()
    {
        return $this->hasMany(Note::class);
    }


    public function getLastMessageAttribute()
    {
        $last_message = Message::where('conversation_id', $this->attributes['id'])->latest('created_at')->first();
        if ($last_message){
            $last_message = $last_message->toArray();
            if (Auth::check() && $last_message['user_id'] == Auth::user()->id)
            {
                $last_message['message'] = 'You: ' . $last_message['message'];
                $last_message['is_read'] = 1;
            }
        }

        return $last_message ?? [ 
            'timestamp' => 0,
            'is_read' => 1, 
            'message' => '<span class="font-weight-light">No messages yet</span>' 
        ];
    }

    
    public function getUserAttribute()
    {
        if($this->user_id) :
            $user = User::findOrFail($this->user_id);
        else:
            // check if has members
            $user = [
                'id' => $this->metadata['guest_cookie'] ?? '',
                'full_name' =>  $this->metadata['name'] ?? '',
                'initials' => 'G',
            ];
        endif;

        return $user;
    }

    public function getTimestampAttribute()
    {
        return $this->created_at->getPreciseTimestamp(3);
    }
}
