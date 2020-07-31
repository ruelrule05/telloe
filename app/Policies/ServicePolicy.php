<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Service;
use App\Models\Contact;
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

    public function update(User $user, Service $service)
    {
        return $user->id == $service->user_id;
    }

    public function delete(User $user, Service $service)
    {
        return $user->id == $service->user_id;
    }

    public function addBooking(User $user, Service $service)
    {
        return $user->id == $service->user_id || Contact::where('user_id', $service->user->id)->where('contact_user_id', $user->id)->first();
    }

    public function blacklist(User $user, Service $service)
    {
        return $user->id == $service->user_id;
    }

    public function create_invoice(User $user, Service $service)
    {
        return $user->id == $service->user_id;
    }
    
    public function create_subscription(User $user, Service $service)
    {
        return $user->id == $service->user_id;
    }

}
