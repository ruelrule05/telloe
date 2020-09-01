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
        'email', 
        'username', 
        'phone', 
        'timezone',
        'ignored_calendar_events',
        'id_documents',
        'notify_email',
        'notify_sms',
        'dial_code'
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
        'created_at_format',
        'updated_at', 
        'facebook_id', 
        'google_id', 
        'stripe_account',
        'phone', 
        'google_calendars',
        'google_calendar_id', 
        'google_calendar_events', 
        'outlook_calendars', 
        'outlook_calendar_id', 
        'outlook_calendar_events', 
        'ignored_calendar_events',
        'id_documents'
    ];

    
    protected $appends = ['full_name', 'initials', 'last_online_format', 'created_at_format'];
    protected $casts = [
        'stripe_account' => 'array',
        'last_online' => 'datetime',
        'google_calendar_token' => 'array',
        'google_calendars' => 'array',
        'google_calendar_events' => 'array',
        'outlook_token' => 'array',
        'outlook_calendars' => 'array',
        'outlook_calendar_events' => 'array',
        'ignored_calendar_events' => 'array',
        'id_documents' => 'array'
    ];



    public function widget()
    {
        return $this->hasOne(Widget::class);
    }

    public function subscription()
    {
        return $this->hasOne(Subscription::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }


    public function contacts()
    {
        return $this->hasMany(Contact::class)->orderBy('created_at', 'DESC');
    }


    public function getFullNameAttribute()
    {
        $first_name = $this->attributes['first_name'];
        $last_name = $this->attributes['last_name'];
        return $first_name || $last_name ? "$first_name $last_name" : $this->attributes['email'];
    }


    public function chatbots()
    {
        return $this->hasMany(Chatbot::class)->orderBy('created_at', 'DESC');
    }


    public function bookings()
    {
        return $this->hasMany(Booking::class)->orderBy('date', 'DESC');
    }


    public function getInitialsAttribute()
    {
        $first_name = $this->attributes['first_name'];
        $last_name = $this->attributes['last_name'];
        return $first_name || $last_name ? strtoupper(substr($this->attributes['first_name'], 0, 1) . substr($this->attributes['last_name'], 0, 1)) : strtoupper(substr($this->attributes['email'], 0, 1));
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


    public function getCreatedAtFormatAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->format('M d, Y');
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
