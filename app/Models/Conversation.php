<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Auth;

class Conversation extends Model
{
    //
    protected $fillable = ['user_id', 'metadata', 'source', 'status', 'name', 'tags'];
    public $appends = ['member', 'last_message', 'timestamp'];
    protected $casts = [
        'metadata' => 'array',
        'tags' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function members()
    {
        return $this->hasMany(ConversationMember::class)->orderBy('created_at', 'DESC');
    }

    public function messages()
    {
    	return $this->hasMany(Message::class);
    }

    public function getMemberAttribute()
    {
        $member = null;
        switch(Auth::user()->role->role) :
            case 'client':
                $member = $this->members()->first()->user;
                break;

            case 'customer':
                $member = $this->user;
                break;
        endswitch;

        return $member;
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

    

    public function getTimestampAttribute()
    {
        return $this->created_at->getPreciseTimestamp(3);
    }
}
