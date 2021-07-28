<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ContactPackage extends BaseModel
{
    use HasFactory;

    protected $fillable = ['package_id', 'contact_id', 'service'];
    protected $casts = [
        'service' => 'array',
    ];

    public function package()
    {
        return $this->belongsTo(Package::class);
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
