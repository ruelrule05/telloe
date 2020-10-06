<?php

namespace App\Models;

class WidgetType extends BaseModel
{
    //
    protected $fillable = ['widget_id', 'page', 'state'];
    public $timestamps = false;

    public function widgets()
    {
        return $this->hasMany(Widget::class);
    }
}
