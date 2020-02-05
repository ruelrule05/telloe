<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    //
    protected $fillable = ['widget_id', 'user_id', 'message', 'inquiry_type_id', 'interests'];
    protected $casts = [
        'interests' => 'array'
    ];

    public function widget()
    {
        return $this->belongsTo(Widget::class);
    }

     public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function inquiryMedia()
    {
    	return $this->hasMany(InquiryMedia::class);
    }

    public function offers()
    {
        return $this->hasMany(Offer::class)->orderBy('created_at', 'DESC');
    }

    public function messages()
    {
    	return $this->hasMany(Message::class);
    }

    public function getCreatedAtAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->diffForHumans();
    }
}
