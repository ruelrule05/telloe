<?php

namespace App\Models;
use Carbon\Carbon;
use App\Events\NewNotificationEvent;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Notification extends BaseModel
{
    use HasFactory;
    protected $fillable = ['user_id', 'description', 'link', 'is_read'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getCreatedAtAttribute($value)
    {
        $created_diff = Carbon::parse($value)->diffForHumans(null, true);
        return str_replace(['hour', 'hours', 'minute', 'minutes'], ['hr', 'hrs', 'min', 'mins'], $created_diff) . ' ago';
    }

    public static function boot()
    {
        parent::boot();

        static::created(function ($notification) {
            broadcast(new NewNotificationEvent($notification));
        });
    }
}
