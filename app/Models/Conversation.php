<?php

namespace App\Models;

use Carbon\Carbon;
use Auth;

class Conversation extends BaseModel
{
    //
    protected $fillable = ['user_id', 'user_customer_id', 'metadata', 'source', 'status', 'name', 'tags', 'custom_fields'];
    public $appends = ['member', 'last_message', 'timestamp'];
    protected $casts = [
        'metadata' => 'array',
        'tags' => 'array',
        'custom_fields' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function customer()
    {
        return $this->belongsTo(UserCustomer::class, 'user_customer_id');
    }

    public function members()
    {
        return $this->hasMany(ConversationMember::class)->orderBy('created_at', 'DESC');
    }

    public function messages()
    {
    	return $this->hasMany(Message::class);
    }


    public function notes()
    {
        return $this->hasMany(Note::class)->orderBy('created_at', 'DESC');
    }

    public function getMemberAttribute()
    {
        $member = null;
        if($this->members->count() == 1) :
            switch(Auth::user()->role->role) :
                case 'client':
                    $member = $this->members()->first()->user;
                    break;

                case 'customer':
                    $member = $this->user;
                    break;
            endswitch;
        elseif(isset($this->attributes['user_customer_id'])):
            $member = UserCustomer::find($this->attributes['user_customer_id']);
        else :
            $member = [
                'profile_image' => '',
                'initials' => 'G'
            ];
        endif;

        return $member;
    }



    public function getLastMessageAttribute()
    {
        $last_message = Message::where('conversation_id', $this->attributes['id'])->latest('created_at')->first();
        if ($last_message) :
            $last_message = $last_message->load('user')->toArray();

            if($last_message['type'] != 'text') $last_message['message'] = $last_message['type'];
            if (Auth::check() && $last_message['user_id'] == Auth::user()->id) :
                $last_message['message'] = 'You: ' . $last_message['message'];
                $last_message['is_read'] = 1;
            elseif ($this->members()->count() > 1) :
                $last_message['message'] = $last_message['user']['first_name'] . ': ' . $last_message['message'];
            endif;

        endif;

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
