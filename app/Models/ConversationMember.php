<?php

namespace App\Models;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ConversationMember extends BaseModel
{
    use HasFactory;
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
