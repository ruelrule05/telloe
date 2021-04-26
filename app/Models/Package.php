<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

class Package extends BaseModel
{
    //
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
        return $this->hasMany(ContactPackage::class);
    }
}
