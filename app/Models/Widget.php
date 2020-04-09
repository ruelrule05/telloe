<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Widget extends Model
{
    //
    protected $fillable = ['name', 'heading', 'domain', 'slug', 'fb_page', 'widget_type_id', 'colors', 'notify_messenger', 'notify_sms', 'default_chatbot'];
    protected $casts = [
        'fb_page' => 'array',
        'colors' => 'array',
        'notify_messenger' => 'boolean',
        'notify_sms' => 'boolean',
    ];
    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function widgetRules()
    {
        return $this->hasMany(WidgetRule::class)->orderBy('created_at', 'DESC');
    }

    public function members()
    {
        return $this->hasMany(Member::class)->orderBy('created_at', 'DESC');
    }

    public function inquiries()
    {
        return $this->hasMany(Inquiry::class)->orderBy('created_at', 'DESC');
    }

    public function messages()
    {
        return $this->hasMany(Message::class)->orderBy('created_at', 'DESC');
    }

    public function widgetType()
    {
        return $this->belongsTo(WidgetType::class);
    }


    public function bookings()
    {
        return $this->hasMany(Booking::class)->orderBy('created_at', 'DESC');
    }

    public function convos()
    {
        return $this->hasMany(Convo::class)->orderBy('created_at', 'DESC');
    }

    public function defaultChatbot()
    {
        return $this->belongsTo(Chatbot::class, 'default_chatbot');
    }
}
