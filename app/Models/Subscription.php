<?php

namespace App\Models;

class Subscription extends BaseModel
{
    //
    protected $fillable = ['user_id', 'plan_id', 'stripe_subscription_id', 'trial_expires_at'];
    protected $casts = [
        'trial_expires_at' => 'date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }
}
