<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    //
    protected $fillable = ['user_id'];

    public function message_sent()
    {
    	return $this->hasMany(Message::class);
    }
}
