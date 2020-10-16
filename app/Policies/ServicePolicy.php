<?php

namespace App\Policies;

use App\Models\Contact;
use App\Models\Service;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ServicePolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function show(User $user, Service $service)
    {
        return $user->id == $service->user_id || $user->id == ($service->member->member_user_id ?? null);
    }

    public function update(User $user, Service $service)
    {
        return $user->id == $service->user_id || $user->id == ($service->member->member_user_id ?? null);
    }

    public function delete(User $user, Service $service)
    {
        return $user->id == $service->user_id || $user->id == ($service->parentService->user_id ?? null) || $user->id == ($service->member->member_user_id ?? null);
    }

    public function addBooking(User $user, Service $service)
    {
        return $user->id == $service->user_id || $user->id == ($service->member->member_user_id ?? null) || Contact::where('user_id', $service->user->id)->where('contact_user_id', $user->id)->first();
    }

    public function blacklist(User $user, Service $service)
    {
        return $user->id == $service->user_id || $user->id == ($service->member->member_user_id ?? null);
    }

    public function create_invoice(User $user, Service $service)
    {
        return $user->id == $service->user_id || $user->id == ($service->member->member_user_id ?? null);
    }

    public function create_subscription(User $user, Service $service)
    {
        return $user->id == $service->user_id || $user->id == ($service->member->member_user_id ?? null);
    }
}
