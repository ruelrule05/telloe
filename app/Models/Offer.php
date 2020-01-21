<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Offer extends Model
{
    //
    protected $fillable = ['inquiry_id', 'user_id', 'services', 'discount', 'discount_text', 'booked'];
    protected $casts = [
        'services' => 'array',
        'booked' => 'boolean',
    ];

    public function user()
    {
    	return $this->belongsTo(User::class);
    }


    public function inquiry()
    {
    	return $this->belongsTo(Inquiry::class);
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('M d, Y h:iA');
    }

}
