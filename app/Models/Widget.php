<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Widget extends Model
{
    //
    protected $fillable = ['user_id', 'domain', 'slug', 'fb_page_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function widgetRules()
    {
        return $this->hasMany(WidgetRule::class)->orderBy('created_at', 'DESC');
    }
}
