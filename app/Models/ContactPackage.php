<?php

namespace App\Models;

class ContactPackage extends BaseModel
{
    //

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
}
