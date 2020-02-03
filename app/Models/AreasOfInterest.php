<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AreasOfInterest extends Model
{
    //
    protected $fillable = ['area', 'sample_images'];
    protected $casts = [
        'sample_images' => 'array',
    ];

    public function offer()
    {
    	return $this->belongsTo(Offer::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
