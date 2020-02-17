<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 'last_name', 'email', 'password', 'profile_image', 'stripe_customer_id', 'psid'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'created_at', 'updated_at'
    ];

    
    protected $appends = ['full_name'];



    public function widget()
    {
        return $this->hasOne(Widget::class);
    }


    public function inquiries()
    {
        return $this->hasMany(Inquiry::class)->orderBy('created_at', 'DESC');
    }


    public function offers()
    {
        return $this->hasMany(Offer::class, 'customer_id')->orderBy('created_at', 'DESC');
    }

    public function subscription()
    {
        return $this->hasOne(Subscription::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }


    public function getFullNameAttribute()
    {
        return $this->attributes['first_name'] .
            ' ' .
            $this->attributes['last_name'];
    }


    public function convoUsers()
    {
        return $this->hasMany(ConvoUser::class);
    }








    // JWT
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
