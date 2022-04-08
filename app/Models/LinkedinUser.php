<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LinkedinUser extends BaseModel
{
    use HasFactory;
    protected $fillable = ['user_id', 'urn', 'custom_fields', 'tags', 'label'];
    protected $casts = [
        'custom_fields' => 'array',
        'tags' => 'array',
        'label' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
