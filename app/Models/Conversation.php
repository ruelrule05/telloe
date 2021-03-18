<?php

namespace App\Models;

use Auth;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;

class Conversation extends BaseModel
{
    //
    use SoftDeletes;

    protected $fillable = ['user_id', 'contact_id', 'metadata', 'name', 'tags'];
    public $appends = ['member', 'last_message', 'timestamp', 'notes'];
    protected $casts = [
        'metadata' => 'array',
        'tags' => 'array',
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

    public function getNotesAttribute()
    {
        return Note::where('conversation_id', $this->attributes['id'])->where('user_id', Auth::user()->id)->orderBy('created_at', 'DESC')->get();
    }

    public function getMemberAttribute()
    {
        $member = null;
        if ($this->members->count() == 1) {
            $member = $this->user->load('role');
            if (Auth::user()->id == $member->id) {
                $member = $this->members()->first()->user->load('role')->makeVisible(['last_online_format']);
                if (isset($this->attributes['contact_id'])) {
                    $member->contact = Contact::find($this->attributes['contact_id']);
                }
            }
        } else {
            $member = [
                'profile_image' => '',
                'initials' => 'G'
            ];
        }

        return $member;
    }

    public function getLastMessageAttribute()
    {
        $last_message = Message::where('conversation_id', $this->attributes['id'])->latest('created_at')->first();
        if ($last_message) {
            $last_message = $last_message->load('user')->toArray();

            if ($last_message['type'] != 'text' && $last_message['type'] != 'call_ended' && $last_message['type'] != 'call_failed') {
                $last_message['message'] = $last_message['type'];
            } elseif ($last_message['type'] == 'call_failed') {
                $last_message['message'] = $last_message['user_id'] == Auth::user()->id ? 'Call failed' : 'You missed a call';
            }
            if (Auth::check() && $last_message['user_id'] == Auth::user()->id) {
                $last_message['message'] = 'You: ' . $last_message['message'];
                $last_message['is_read'] = 1;
            } elseif ($this->members()->count() > 1) {
                $last_message['message'] = $last_message['user']['first_name'] . ': ' . $last_message['message'];
            }
        }

        return $last_message ?? [
            //'timestamp' => Carbon::parse($this->attributes['created_at'])->getPreciseTimestamp(6),
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
