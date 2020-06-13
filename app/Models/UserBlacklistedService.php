<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserBlacklistedService extends Model
{
    //
    protected $fillable = ['user_id', 'service_id', 'is_blacklisted'];
    protected $casts = [
        'is_blacklisted' => 'boolean'
    ];

    public function user() 
    {
    	return $this->belongsTo(User::class);
    }

    public function service() 
    {
    	return $this->belongsTo(Service::class);
    }
}
