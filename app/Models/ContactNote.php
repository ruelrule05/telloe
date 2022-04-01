<?php

namespace App\Models;

class ContactNote extends BaseModel
{
    protected $fillable = ['contact_id', 'note', 'linkedin_user'];

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
}
