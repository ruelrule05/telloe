<?php

namespace App\Models;

use Carbon\Carbon;

class UserCustomer extends BaseModel
{
    //
    protected $fillable = ['user_id', 'customer_id', 'email', 'first_name', 'last_name', 'is_pending', 'invite_token', 'blacklisted_services', 'invoices', 'subscriptions'];
    protected $appends = ['full_name', 'initials', 'created_at_format'];
    protected $casts = [
        'blacklisted_services' => 'array',
        'invoices' => 'array',
        'subscriptions' => 'array'
    ];

    public function user() 
    {
    	return $this->belongsTo(User::class);
    }

    public function customer() 
    {
    	return $this->belongsTo(User::class, 'customer_id')->withDefault(function($customer, $userCustomer) {
            $customer->first_name = $userCustomer->attributes['first_name'];
            $customer->last_name = $userCustomer->attributes['last_name'];
            $customer->email = $userCustomer->attributes['email'];
            $customer->initials = strtoupper(substr($userCustomer->attributes['first_name'], 0, 1) . substr($userCustomer->attributes['last_name'], 0, 1));
            $customer->last_online = null;
        });
    }

    public function getFullNameAttribute()
    {
        return $this->attributes['first_name'] .
            ' ' .
            $this->attributes['last_name'];
    }

    public function getInitialsAttribute()
    {
        return strtoupper(substr($this->attributes['first_name'], 0, 1) . substr($this->attributes['last_name'], 0, 1));
    }

    public function getCreatedAtFormatAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->format('M d, Y');
    }

}
