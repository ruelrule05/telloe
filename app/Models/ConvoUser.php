<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConvoUser extends Model
{
    //
    protected $fillable = ['convo_id', 'user_id'];

    public function convo()
    {
    	return $this->belongsTo(Convo::class);
    }

    public function user()
    {
    	return $this->belongsTo(User::class);
    }
}
