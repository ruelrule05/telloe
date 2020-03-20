<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chatbot extends Model
{
    //
    protected $fillable = ['bot_id', 'user_id', 'title', 'description'];

    public function user()
    {
    	return $this->belongsTo(User::class);
    }

    public function chatboxes()
    {
    	return $this->hasMany(Chatbox::class);
    }
}
