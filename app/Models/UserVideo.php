<?php

namespace App\Models;

class UserVideo extends BaseModel
{
    protected $fillable = ['user_id', 'source', 'thumbnail', 'gif', 'duration', 'tags'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
