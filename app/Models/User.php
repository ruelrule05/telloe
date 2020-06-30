<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Carbon\Carbon;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 
        'last_name', 
        'email', 'password', 
        'username', 
        'profile_image', 
        'stripe_customer_id', 
        'psid', 
        'phone', 
        'facebook_id', 
        'google_id', 
        'last_online', 
        'timezone', 
        'ignored_calendar_events'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 
        'remember_token', 
        'created_at', 
        'updated_at', 
        'facebook_id', 
        'google_id', 
        'stripe_customer_id', 
        'phone', 
        'google_calendars',
        'google_calendar_id', 
        'google_calendar_events', 
        'outlook_calendars', 
        'outlook_calendar_id', 
        'outlook_calendar_events', 
        'ignored_calendar_events'
    ];

    
    protected $appends = ['full_name', 'initials', 'last_online_format'];
    protected $casts = [
        'last_online' => 'datetime',
        'google_calendar_token' => 'array',
        'google_calendars' => 'array',
        'google_calendar_events' => 'array',
        'outlook_token' => 'array',
        'outlook_calendars' => 'array',
        'outlook_calendar_events' => 'array',
        'ignored_calendar_events' => 'array',
    ];



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


    public function chatbots()
    {
        return $this->hasMany(Chatbot::class)->orderBy('created_at', 'DESC');
    }


    public function getInitialsAttribute()
    {
        return strtoupper(substr($this->attributes['first_name'], 0, 1) . substr($this->attributes['last_name'], 0, 1));
    }


    public function getLastOnlineFormatAttribute()
    {
        return $this->attributes['last_online'] ? Carbon::parse($this->attributes['last_online'])->diffForHumans() : '';
    }

    public function customers()
    {
        return $this->hasMany(UserCustomer::class);
    }

    public function customFields()
    {
        return $this->hasOne(UserCustomField::class);
    }

    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function getTimezoneAttribute($value)
    {
        return strlen($value) ? $value : config('app.timezone');
    }

    
    protected function castAttribute($key, $value)
    {
        if(is_null($value)) :
            switch($this->getCastType($key)) :
                case 'array':
                    return [];

                /*case 'object':
                    return new \stdClass();*/
            endswitch;
        endif;

        return parent::castAttribute($key, $value);
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
