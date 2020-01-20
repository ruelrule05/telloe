<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    //
    protected $fillable = ['user_id', 'message', 'inquiry_type_id', 'interest'];

    public function inquiryMedia()
    {
    	return $this->hasMany(InquiryMedia::class);
    }

    public function message_sent()
    {
    	return $this->hasMany(Message::class);
    }
}
