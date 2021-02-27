<?php

namespace App\Models;

class Widget extends BaseModel
{
    //
    protected $fillable = ['user_id', 'name', 'heading', 'domain', 'slug', 'fb_page', 'widget_type_id', 'colors', 'notify_messenger', 'notify_sms', 'default_chatbot', 'business_hours'];
    protected $casts = [
        'fb_page' => 'array',
        'colors' => 'array',
        'notify_messenger' => 'boolean',
        'notify_sms' => 'boolean',
        'members' => 'array',
        'business_hours' => 'array',
    ];
    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function widgetRules()
    {
        return $this->hasMany(WidgetRule::class)->orderBy('created_at', 'DESC');
    }

    public function members()
    {
        return $this->hasMany(WidgetMember::class)->orderBy('created_at', 'DESC');
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
