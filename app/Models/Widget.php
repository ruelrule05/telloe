<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Widget extends Model
{
    //
    protected $fillable = ['user_id', 'heading', 'domain', 'slug', 'fb_page'];
    protected $casts = [
        'fb_page' => 'array'
    ];
    protected $hidden = [
        'id',
        'user_id',
        'fb_page',
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
}
