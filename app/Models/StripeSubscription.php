<?php

namespace App\Models;

class StripeSubscription extends BaseModel
{
    //
    protected $fillable = ['user_id', 'contact_id', 'subscription_id', 'status', 'amount', 'currency', 'interval', 'services'];
    protected $casts = [
        'services' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
}
