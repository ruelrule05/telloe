<?php

namespace App\Models;

class WidgetRule extends BaseModel
{
    //
    protected $fillable = ['widget_id', 'page', 'state'];

    public function widget()
    {
        return $this->belongsTo(Widget::class);
    }

    public function getStateAttribute($value)
    {
        return ucfirst($value);
    }
}
