<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Note extends Model
{
    //
    protected $fillable = ['conversation_id', 'notes', 'tags'];
    protected $appends = ['created_at_format'];
    protected $casts = [
        'tags' => 'array',
    ];
    public function conversation()
    {
    	return $this->belongsTo(Conversation::class);
    }


    public function getCreatedAtFormatAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->format('h:iA \\o\\n D');
    }
    
    
    protected function castAttribute($key, $value)
    {
        if ($this->getCastType($key) == 'array' && is_null($value)) {
            return [];
        }

        return parent::castAttribute($key, $value);
    }
}
