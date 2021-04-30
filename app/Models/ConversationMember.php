<?php

namespace App\Models;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ConversationMember extends BaseModel
{
    //
    protected $fillable = ['conversation_id', 'user_id', 'email'];

    use AuthorizesRequests;

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
