<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Message extends Model
{
    //
    protected $fillable = ['conversation_id', 'user_id', 'message', 'type', 'source', 'preview', 'metadata', 'is_read', 'timestamp'];
    protected $casts = [
        'metadata' => 'array',
        'is_read' => 'boolean',
    ];

    public function conversation()
    {
    	return $this->belongsTo(Conversation::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getCreatedAtAttribute($value)
    {
    	return Carbon::parse($value)->format('h:iA \\o\\n D');
    }

    public function getSourceAttribute($value)
    {
        return config('app.url') . $value;
    }

    public function getPreviewAttribute($value)
    {
        return config('app.url') . $value;
    }
}
