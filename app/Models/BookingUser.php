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
        return $this->belongsTo(User::class)->withDefault(function ($user, $model) {
            $user->first_name = $model->guest['first_name'] ?? '';
            $user->last_name = $model->guest['last_name'] ?? '';
            $user->email = $model->guest['email'] ?? 'Guest';
            $user->timezone = 'Australia/Brisbane';
        });
    }
}
