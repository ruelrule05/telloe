<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;
use Auth;

class Conversation extends BaseModel
{
    //
    use SoftDeletes;
    
    protected $fillable = ['user_id', 'contact_id', 'metadata', 'source', 'name', 'tags', 'custom_fields'];
    public $appends = ['member', 'last_message', 'timestamp'];
    protected $casts = [
        'metadata' => 'array',
        'tags' => 'array',
        'custom_fields' => 'array',
        'archive_users' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class, 'contact_id');
    }

    public function members()
    {
        return $this->hasMany(ConversationMember::class)->orderBy('created_at', 'DESC');
    }

    public function messages()
    {
    	return $this->hasMany(Message::class)->orderBy('timestamp', 'DESC');
    }


    public function notes()
    {
        return $this->hasMany(Note::class)->orderBy('created_at', 'DESC');
    }

    public function getMemberAttribute()
    {
        $member = null;
        if($this->members->count() == 1) :
            $member = $this->user->load('role');
            if(Auth::user()->id == $member->id) :
                $member = $this->members()->first()->user->load('role');
            endif;
        elseif(isset($this->attributes['contact_id'])):
            $member = Contact::find($this->attributes['contact_id']);
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
            'message' => 'No messages yet' 
        ];
    }

    

    public function getTimestampAttribute()
    {
        return $this->created_at->getPreciseTimestamp(3);
    }
}
