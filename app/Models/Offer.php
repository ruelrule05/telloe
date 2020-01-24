<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Offer extends Model
{
    //
    protected $fillable = ['member_id', 'customer_id', 'services', 'discount', 'discount_text', 'booked'];
    protected $casts = [
        'services' => 'array',
        'booked' => 'boolean',
    ];

    public function member()
    {
    	return $this->belongsTo(Member::class, 'member_id');
    }

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class)->orderBy('created_at', 'DESC');
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('M d, Y h:iA');
    }
}
