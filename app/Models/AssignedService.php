<?php

namespace App\Models;

class AssignedService extends BaseModel
{
    //
    protected $fillable = ['user_id', 'member_id', 'service_id'];
    
    public function user() 
    {
    	return $this->belongsTo(User::class);
    }

    public function member() 
    {
    	return $this->belongsTo(Member::class);
    }

    public function service() 
    {
    	return $this->belongsTo(Service::class);
    }
}
