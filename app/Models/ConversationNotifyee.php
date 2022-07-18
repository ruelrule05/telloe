<?php

namespace App\Models;

class ConversationNotifyee extends BaseModel
{
    protected $fillable = ['name', 'email', 'conversation_id', 'last_notified_at'];

    protected $casts = [
        'last_notified_at' => 'datetime'
    ];

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }
}
