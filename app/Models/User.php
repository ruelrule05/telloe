<?php

namespace App\Models;

use App\Mail\NewUser;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Http;
use Mail;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    use HasFactory;

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
        'dial_code',
        'profile_image',
        'facebook_id',
        'google_id',
        'default_availability',
        'google_calendar_events',
        'blocked_timeslots',
        'trial_expires_at',
        'packages',
        'team',
        'payments',
        'outlook_calendar_events',
        'match_up',
        'messages',
        'contacts'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $visible = [
        'id',
        'first_name',
        'last_name',
        'email',
        'username',
        'profile_image',
        'timezone',
        'initials',
        'full_name',
        'dial_code',
        'blocked_timeslots',
        'is_premium',
        'trial_expires_at',
        'packages',
        'team',
        'payments',
        'match_up',
        'messages',
        'contacts'
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
        'default_availability' => 'array',
        'blocked_timeslots' => 'array',
        'google_calendar_id' => 'array',
        'outlook_calendar_id' => 'array',
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

    public function bookings()
    {
        return $this->hasMany(Booking::class)->orderBy('date', 'DESC');
    }

    public function getInitialsAttribute()
    {
        $first_name = $this->attributes['first_name'] ?? $this->first_name;
        $last_name = $this->attributes['last_name'] ?? $this->last_name;
        $email = $this->attributes['email'] ?? $this->email;
        $email = is_array($email) ? $email['email'] : $email;
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
        return $this->hasMany(Service::class)->where('type', 'custom');
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

    public function stripeSubscriptions()
    {
        return $this->hasMany(StripeSubscription::class)->latest();
    }

    public function videoMessages()
    {
        return $this->hasMany(VideoMessage::class)->latest();
    }

    public function videos()
    {
        return $this->hasMany(UserVideo::class)->latest();
    }
}
