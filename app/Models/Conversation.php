<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Auth;

class Conversation extends Model
{
    //
    protected $fillable = ['widget_id', 'user_id', 'metadata'];
    public $appends = ['last_message'];

    public function widget()
    {
    	return $this->belongsTo(Widget::class);
    }

    public function user()
    {
    	return $this->belongsTo(User::class);
    }

    public function messages()
    {
    	return $this->hasMany(Message::class);
    }


    public function getLastMessageAttribute()
    {
        $last_message = Message::where('conversation_id', $this->attributes['id'])->latest('created_at')->first();
        if ($last_message){
            $last_message = $last_message->load('user')->toArray();
            if ($last_message['user_id'] == Auth::user()->id)
            {
                $last_message['message'] = 'You: ' . $last_message['message'];
                $last_message['is_read'] = 1;
            }
        }

        return $last_message ?? [ 
            'timestamp' => Carbon::now()->valueOf(),
            'is_read' => 1, 
            'message' => '<span class="font-weight-light">No messages yet</span>' 
        ];
    }
}
