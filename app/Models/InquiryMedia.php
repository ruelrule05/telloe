<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InquiryMedia extends Model
{
    //
    protected $fillable = ['inquiry_id', 'media', 'type', 'preview', 'comment'];

    public function inquiry()
    {
    	return $this->belongsTo(Inquiry::class);
    }
}
