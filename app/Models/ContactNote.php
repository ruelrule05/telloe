<?php

namespace App\Models;

class ContactNote extends BaseModel
{
    protected $fillable = ['contact_id', 'note'];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
}
