<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Member extends BaseModel
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['user_id', 'member_user_id', 'email', 'first_name', 'last_name', 'is_pending', 'invite_token'];
    protected $appends = ['full_name', 'initials', 'created_at_format'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function services()
    {
        return $this->hasMany(Service::class)->orderBy('created_at', 'DESC');
    }

    public function assignedServices()
    {
        return $this->hasMany(Service::class, 'member_id', 'id');
    }

    public function memberUser()
    {
        return $this->belongsTo(User::class, 'member_user_id')->withDefault(function ($memberUser, $member) {
            $memberUser->first_name = $member->attributes['first_name'];
            $memberUser->last_name = $member->attributes['last_name'];
            $memberUser->email = $member->attributes['email'];
            $memberUser->last_online = null;
        });
    }

    public function getFullNameAttribute()
    {
        $first_name = $this->attributes['first_name'] ?? $this->first_name;
        $last_name = $this->attributes['last_name'] ?? $this->last_name;
        return $first_name || $last_name ? "$first_name $last_name" : $this->attributes['email'] ?? $this->email;
    }

    public function getInitialsAttribute()
    {
        $first_name = $this->attributes['first_name'] ?? $this->first_name;
        $last_name = $this->attributes['last_name'] ?? $this->last_name;
        return $first_name || $last_name ? strtoupper(substr($first_name, 0, 1) . substr($last_name, 0, 1)) : strtoupper(substr($this->attributes['email'] ?? $this->email, 0, 1));
    }

    public function getCreatedAtFormatAttribute()
    {
        return Carbon::parse($this->attributes['created_at'] ?? $this->created_at)->format('M d, Y');
    }
}
