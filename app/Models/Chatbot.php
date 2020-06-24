<?php

namespace App\Models;

class Chatbot extends BaseModel
{
    //
    protected $fillable = ['bot_id', 'user_id', 'title', 'description', 'is_start'];
    protected $casts = [
        'is_start' => 'boolean'
    ];


    public function user()
    {
    	return $this->belongsTo(User::class);
    }

    public function chatboxes()
    {
    	return $this->hasMany(Chatbox::class);
    }
}
