<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;

class Booking extends BaseModel
{
    //
    use SoftDeletes;

    protected $fillable = ['service_id', 'user_id', 'contact_id', 'date', 'start', 'end', 'metadata', 'zoom_link'];
    protected $appends = ['is_expired'];
    protected $casts = [
        'metadata' => 'array',
        'notified_2' => 'boolean',
        'notified_24' => 'boolean',
        'zoom_link' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
        $user = $this->belongsTo(User::class);
        if (! isset($user->id) && isset($this->attributes['contact_id'])) {
            $contact = Contact::with('contactUser')->where('id', $this->attributes['contact_id'])->first();

            return $user->withDefault([
                'first_name' => $contact->contactUser->first_name ?? $contact->first_name,
                'last_name' => $contact->contactUser->last_name ?? $contact->last_name,
                'email' => $contact->contactUser->email ?? $contact->email
            ]);
        } else {
            return $user;
        }
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class)->withTrashed();
    }

    public function getIsExpiredAttribute()
    {
        return Carbon::now()->isAfter(Carbon::parse($this->attributes['date'] . ' ' . $this->attributes['start']));
    }

    public function bookingNote()
    {
        return $this->hasOne(BookingNote::class)->withDefault([
            'note' => '',
        ]);
    }
}
