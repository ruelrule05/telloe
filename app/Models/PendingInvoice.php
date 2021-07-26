<?php

namespace App\Models;
use Carbon\Carbon;

class PendingInvoice extends BaseModel
{
    //
    protected $fillable = ['user_id', 'contact_id', 'service_ids', 'amount']; // , 'currency'
    protected $appends = ['created', 'is_pending'];
    protected $casts = [
        'service_ids' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function getCreatedAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->timestamp;
    }

    public function getIsPendingAttribute()
    {
        return true;
    }
}
