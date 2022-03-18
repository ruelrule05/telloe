<?php

namespace App\Models;

class LinkedinActivity extends BaseModel
{
    //

    protected $fillable = ['user_id', 'activity_id', 'data', 'order'];
    protected $casts = [
        'data' => 'object',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
