<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
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

    public function offers()
    {
        return $this->hasMany(Inquiry::class, 'member_id')->orderBy('created_at', 'DESC');
    }
}
