<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WidgetRule extends Model
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
