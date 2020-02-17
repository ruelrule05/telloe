<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Convo extends Model
{
    //
    public function users()
    {
    	return $this->hasMany(ConvoUser::class);
    }
}
