<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chatbox extends Model
{
    //
    protected $fillable = ['chatbot_id', 'message', 'type', 'input_type', 'variable', 'top', 'left', 'target', 'buttons', 'is_start'];
    protected $casts = [
        'buttons' => 'array',
        'is_start' => 'boolean'
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
