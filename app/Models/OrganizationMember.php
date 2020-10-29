<?php

namespace App\Models;

class OrganizationMember extends BaseModel
{
    //
    protected $fillable = ['organization_id', 'member_id'];

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function member()
    {
        return $this->belongsTo(Member::class);
    }
}
