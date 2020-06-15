<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserCustomField extends Model
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
