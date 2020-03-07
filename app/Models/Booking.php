<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    //
    protected $fillable = ['widget_id', 'user_id', 'date', 'time', 'metadata'];
    protected $casts = [
        'metadata' => 'array',
    ];

    public function widget()
    {
    	return $this->belongsTo(Widget::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
