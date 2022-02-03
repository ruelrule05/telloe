<?php

namespace App\Models;

use Auth;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Conversation extends BaseModel
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['user_id', 'contact_id', 'metadata', 'name', 'tags', 'slug', 'video_message_id'];
    public $appends = ['member', 'last_message', 'timestamp'];
    protected $casts = [
        'metadata' => 'array',
        'tags' => 'array',
        'archive_users' => 'array',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

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

    // public function getNotesAttribute()
    // {
    //     return Note::where('conversation_id', $this->attributes['id'])->where('user_id', Auth::user()->id)->orderBy('created_at', 'DESC')->get();
    // }

    public function getMemberAttribute()
    {
        $member = null;
        if ($this->members->count() == 1) {
            if (Auth::user()->id == $this->attributes['user_id']) {
                $member = $this->members()->first();
                if ($member->user) {
                    $member = $member->user->makeVisible('last_online_format');
                } elseif ($member->email) {
                    $member = [
                        'initials' => strtoupper($member->email[0]),
                        'full_name' => $member->email,
                        'email' => $member->email,
                    ];
                }
                if (isset($this->attributes['contact_id'])) {
                    $member->contact = Contact::find($this->attributes['contact_id']);
                }
            } else {
                $member = $this->user->makeVisible('last_online_format');
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
