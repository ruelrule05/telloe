<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

class Package extends BaseModel
{
    //
    use SoftDeletes;

    protected $fillable = ['user_id', 'name', 'description', 'services', 'expiration_date', 'price'];
    protected $casts = [
        'services' => 'array',
        'expiration_date' => 'date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function packageItems()
    {
        return $this->hasMany(PackageItem::class);
    }
}
