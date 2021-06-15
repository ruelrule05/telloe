<?php

namespace App\Models;

class BookingUser extends BaseModel
{
    //

    protected $fillable = ['booking_id', 'user_id', 'email', 'guest'];    
    protected $casts = [
        'guest' => 'array',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class)->withDefault(function ($user) {
            $guest = $this->attributes['guest'] ?? $this->guest;
            if ($guest) {
                $guest = json_decode($guest, true);
                $user->first_name = $guest['first_name'] ?? '';
                $user->last_name = $guest['last_name'] ?? '';
                $user->email = $guest['email'];
                $user->timezone = 'Australia/Brisbane';
            }
        });
    }
}
