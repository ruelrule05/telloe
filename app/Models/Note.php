<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Note extends Model
{
    //
    protected $fillable = ['conversation_id', 'notes'];

    public function conversation()
    {
    	return $this->belongsTo(Conversation::class);
    }


    public function getCreatedAtAttribute($value)
    {
    	return Carbon::parse($value)->format('h:iA \\o\\n D');
    }
}
