<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Convo extends Model
{
    //
    protected $fillable = ['widget_id', 'user_id', 'metadata'];
    public function widget()
    {
    	return $this->belongsTo(Widget::class);
    }

    public function user()
    {
    	return $this->belongsTo(User::class);
    }

    public function messages()
    {
    	return $this->hasMany(Message::class);
    }
}
