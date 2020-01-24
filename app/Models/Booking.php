<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    //
    protected $fillable = ['offer_id', 'services', 'customer_info'];
    protected $casts = [
        'services' => 'array',
        'customer_info' => 'array',
    ];

    public function offer()
    {
    	return $this->belongsTo(Offer::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
