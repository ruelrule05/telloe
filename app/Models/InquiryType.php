<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InquiryType extends Model
{
    //
    public function inquiry()
    {
    	return $this->hasMany(Inquiry::class);
    }
}
