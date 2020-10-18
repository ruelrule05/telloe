<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

class PackageItem extends BaseModel
{
    //
    use SoftDeletes;

    protected $fillable = ['package_id', 'service_id', 'bookings_count'];
    protected $casts = [
    ];

    public function package()
    {
        return $this->belongsTo(Package::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
