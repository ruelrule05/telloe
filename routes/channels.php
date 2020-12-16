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
Broadcast::channel('TestChannel', function () {
    return Auth::check();
});
Broadcast::channel('AppChannel', function () {
    return true;
});
Broadcast::channel('conversations.{conversation}', function ($user, Conversation $conversation) {
    return $user->can('show', $conversation) ? $user : false;
});
Broadcast::channel('onlineUsers', function () {
    return Auth::user()->id ?? false;
});