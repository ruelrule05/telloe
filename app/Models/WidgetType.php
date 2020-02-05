<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WidgetType extends Model
{
    //
    protected $fillable = ['widget_id', 'page', 'state'];
    public $timestamps = false;
    
    public function widgets()
    {
        return $this->hasMany(Widget::class);
    }
}
