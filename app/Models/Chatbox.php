<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chatbox extends Model
{
    //
    protected $fillable = ['chatbot_id', 'target', 'type', 'message', 'top', 'left', 'buttons'];
    protected $casts = [
        'buttons' => 'array',
    ];

    public function chatbot()
    {
    	return $this->belongsTo(Chatbot::class);
    }

    public function target()
    {
    	return $this->belongsTo(Chatbox::class, 'id', 'target');
    }
}
