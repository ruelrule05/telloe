<?php

namespace App\Models;

class UserVideo extends BaseModel
{
    protected $fillable = ['user_id', 'source', 'preview', 'duration'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
