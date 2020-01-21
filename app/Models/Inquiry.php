<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    //
    protected $fillable = ['inquiry_id', 'message', 'inquiry_type_id', 'interest'];

    public function inquiryMedia()
    {
    	return $this->hasMany(InquiryMedia::class);
    }

    public function offers()
    {
        return $this->hasMany(Offer::class)->orderBy('created_at', 'DESC');
    }

    public function message_sent()
    {
    	return $this->hasMany(Message::class);
    }
}
