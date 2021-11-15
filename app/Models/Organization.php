<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Organization extends BaseModel
{
    use HasFactory;
    protected $fillable = ['user_id', 'name', 'slug', 'show_user_services', 'services'];
    protected $casts = [
        'show_user_services' => 'boolean',
        'services' => 'array',
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
