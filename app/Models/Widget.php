<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Widget extends Model
{
    //
    protected $fillable = ['user_id', 'heading', 'domain', 'slug', 'fb_page', 'widget_type_id'];
    protected $casts = [
        'fb_page' => 'array'
    ];
    protected $hidden = [
        'user_id',
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
        return $this->hasMany(Member::class)->orderBy('created_at', 'DESC');
    }

    public function inquiries()
    {
        return $this->hasMany(Inquiry::class)->orderBy('created_at', 'DESC');
    }

    public function widgetType()
    {
        return $this->belongsTo(WidgetType::class);
    }
}
