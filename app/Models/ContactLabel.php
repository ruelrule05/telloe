<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class ContactLabel extends BaseModel
{
    use HasFactory;
    protected $fillable = ['user_id', 'label', 'color', 'text_color'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
