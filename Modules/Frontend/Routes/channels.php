<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/
use App\Models\Conversation;
use App\Models\User;

Broadcast::channel('AppChannel', function () {
    return ['connected' => true];
});
Broadcast::channel('users.{user}', function ($auth, $userId) {
    $user = User::where('id', $userId)->first();
    return $auth->id == $user->id ? ['id' => $user->id] : ['error' => 'unauthorized'];
});
Broadcast::channel('conversations.{conversation}', function ($user, Conversation $conversation) {
    return $user->can('show', $conversation) ? ['id' => $user->id] : ['error' => 'unauthorized'];
});
Broadcast::channel('onlineUsers', function () {
    return ['id' => Auth::user()->id] ?? false;
});