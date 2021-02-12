<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Http;
use Mail;
use Modules\Frontend\Mail\NewUser;
use Tymon\JWTAuth\Contracts\JWTSubject;

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
        'notify_message',
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
        'id_documents',
        'google_calendar_token',
        'outlook_token',
        'xero_token',
        'xero_tenant_id',
        'zoom_token'
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
        'id_documents' => 'array',
        'xero_token' => 'array',
        'zoom_token' => 'array',
        'phone' => 'nullable|int',
    ];

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
        $first_name = $this->attributes['first_name'] ?? $this->first_name;
        $last_name = $this->attributes['last_name'] ?? $this->first_name;
        $email = $this->attributes['email'] ?? $this->email;
        return $first_name || $last_name ? "$first_name $last_name" : $email;
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
        $first_name = $this->attributes['first_name'] ?? $this->first_name;
        $last_name = $this->attributes['last_name'] ?? $this->last_name;
        $email = $this->attributes['email'] ?? $this->email;
        return $first_name || $last_name ? strtoupper(substr($first_name, 0, 1) . substr($last_name, 0, 1)) : strtoupper(substr($email, 0, 1));
    }

    public function getLastOnlineFormatAttribute()
    {
        $last_online = $this->attributes['last_online'] ?? $this->last_online;
        return $last_online ? Carbon::parse($last_online)->diffForHumans() : '';
    }

    public function customers()
    {
        return $this->hasMany(UserCustomer::class)->orderBy('created_at', 'DESC');
    }

    public function packages()
    {
        return $this->hasMany(Package::class)->orderBy('created_at', 'DESC');
    }

    public function customFields()
    {
        return $this->hasOne(UserCustomField::class);
    }

    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function organizations()
    {
        return $this->hasMany(Organization::class)->latest();
    }

    public function bookingLinks()
    {
        return $this->hasMany(BookingLink::class)->latest();
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

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            // $ip = request()->server('HTTP_CF_CONNECTING_IP');
            // if ($ip) {
            //     $ipinfo = json_decode(Http::get("https://ipinfo.io/$ip/json"), true);
            //     if (isset($ipinfo['timezone'])) {
            //         $model->timezone = $ipinfo['timezone'];
            //     }
            // }
        });

        static::created(function ($user) {
            foreach (config('app.admin_emails') as $email) {
                Mail::to($email)->queue(new NewUser($user));
            }
        });

        static::retrieved(function ($model) {
            // $timezone = config('app.timezone');
            // $ip = request()->server('HTTP_CF_CONNECTING_IP');
            // if ($ip) {
            //     $ipinfo = json_decode(Http::get("https://ipinfo.io/$ip/json"), true);
            //     if (isset($ipinfo['timezone'])) {
            //         $timezone = $ipinfo['timezone'];
            //     }
            // }
            // $model->timezone = $timezone;
            // $model->save();
        });
    }
}
