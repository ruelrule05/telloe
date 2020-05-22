<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserCustomer extends Model
{
    //
    protected $fillable = ['user_id', 'customer_id', 'is_pending', 'invite_token'];

    public function user() 
    {
    	return $this->belongsTo(User::class);
    }

    public function customer() 
    {
    	return $this->belongsTo(User::class, 'customer_id');
    }
}
