<?php

namespace App\Models;

class WidgetMember extends BaseModel
{
    //
    protected $fillable = ['widget_id', 'user_id'];

    public function widget()
    {
        return $this->belongsTo(Widget::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
