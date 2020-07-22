<?php

namespace App\Models;

class UserCustomField extends BaseModel
{
    //
    protected $fillable = ['user_id', 'fields'];
    protected $casts = [
        'fields' => 'array',
    ];

    public function user() 
    {
    	return $this->belongsTo(User::class);
    }
    
    protected function castAttribute($key, $value)
    {
        if ($this->getCastType($key) == 'array' && is_null($value)) {
            return [];
        }

        return parent::castAttribute($key, $value);
    }
}
