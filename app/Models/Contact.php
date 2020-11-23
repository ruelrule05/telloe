<?php

namespace App\Models;

use Carbon\Carbon;

class Contact extends BaseModel
{
    //
    protected $fillable = ['user_id', 'contact_user_id', 'email', 'first_name', 'last_name', 'is_pending', 'invite_token', 'blacklisted_services', 'invoices', 'subscriptions', 'stripe_customer_id', 'xero_guid', 'custom_fields'];
    protected $appends = ['full_name', 'initials', 'created_at_format'];
    protected $casts = [
        'blacklisted_services' => 'array',
        'invoices' => 'array',
        'subscriptions' => 'array',
        'custom_fields' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function contactUser()
    {
        return $this->belongsTo(User::class, 'contact_user_id')->withDefault(function ($contactUser, $contact) {
            $contactUser->first_name = $contact->attributes['first_name'];
            $contactUser->last_name = $contact->attributes['last_name'];
            $contactUser->email = $contact->attributes['email'];
            $contactUser->last_online = null;
        });
    }

    public function getFullNameAttribute()
    {
        $first_name = $this->attributes['first_name'];
        $last_name = $this->attributes['last_name'];
        return $first_name || $last_name ? "$first_name $last_name" : $this->attributes['email'];
    }

    public function getInitialsAttribute()
    {
        $first_name = $this->attributes['first_name'];
        $last_name = $this->attributes['last_name'];
        return $first_name || $last_name ? strtoupper(substr($this->attributes['first_name'], 0, 1) . substr($this->attributes['last_name'], 0, 1)) : strtoupper(substr($this->attributes['email'], 0, 1));
    }

    public function getCreatedAtFormatAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->format('M d, Y');
    }

    public function getEmailAttribute($value)
    {
        return $this->contactUser ? $this->contactUser->email : $value;
    }

    public function getFirstNameAttribute($value)
    {
        return $this->contactUser ? $this->contactUser->first_name : $value;
    }

    public function getLastNameAttribute($value)
    {
        return $this->contactUser ? $this->contactUser->last_name : $value;
    }
}
