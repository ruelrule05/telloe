<?php

namespace App\Models;

use Carbon\Carbon;

class Organization extends BaseModel
{
    //
    protected $fillable = ['user_id', 'name', 'slug', 'show_user_services'];
    protected $casts = [
        'show_user_services' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function members()
    {
        return $this->hasMany(OrganizationMember::class)->whereHas('member');
    }

    public function getCreatedAtAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->format('M d, Y');
    }
}
