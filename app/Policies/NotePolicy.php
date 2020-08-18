<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Note;
use Illuminate\Auth\Access\HandlesAuthorization;

class NotePolicy
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

    public function update(User $user, Note $note)
    {
        return $note->user_id == $user->id;
    }

    public function delete(User $user, Note $note)
    {
        return $note->user_id == $user->id;
    }
}
