<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Package extends BaseModel
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['user_id', 'name', 'description', 'services', 'expiration_date', 'price', 'is_available', 'in_widget'];
    protected $casts = [
        'services' => 'array',
        'is_available' => 'boolean',
        'in_widget' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function contactPackages()
    {
        return $this->hasMany(ContactPackage::class)->has('contact');
    }

    public function getServicesAttribute($value)
    {
        $value = json_decode($value, true);
        $serviceIds = collect($value)->map(function ($service) {
            return $service['id'] ?? null;
        });
        return Service::whereIn('id', $serviceIds)->get()->map(function ($service, $index) use ($value) {
            $service->bookings = $value[$index]['bookings'];
            return $service;
        });
    }
}
