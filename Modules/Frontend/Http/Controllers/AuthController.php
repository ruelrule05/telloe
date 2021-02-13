<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\ConversationMember;
use App\Models\Message;
use App\Models\User;
use Auth;
use Illuminate\Support\Arr;
use Image;
use Mail;
use Modules\Frontend\Http\SocialiteHelper;
use Modules\Frontend\Mail\Welcome;

class AuthController extends Controller
{
    public function socialiteCallback($driver)
    {
        $socialiteUser = SocialiteHelper::getSocialiteUser($driver);
        if ($socialiteUser) {
            $data = Arr::except($socialiteUser->user, ['id']);
            $data['first_name'] = $data['first_name'] ?? $data['given_name'];
            $data['last_name'] = $data['last_name'] ?? $data['family_name'];
            $user = User::where('email', $data['email'])->first();
            $driver_id = "{$driver}_id";
            if ($user) {
                if (! $user[$driver_id]) {
                    $user->update([
                        $driver_id => $socialiteUser->user['id']
                    ]);
                }
            } else {
                $time = time();
                $profile_image = 'storage/profile-images/' . $time . '.jpeg';
                Image::make($socialiteUser->getAvatar())->save(public_path($profile_image));
                $data['username'] = $this->generateUsername($data['first_name'], $data['last_name']);
                $data[$driver_id] = $socialiteUser->user['id'];
                $data['profile_image'] = "/$profile_image";
                $user = User::create($data);
                $this->createInitialConversations($user);
                Mail::queue(new Welcome($user));
            }
            Auth::login($user);
        }

        $authorized = Auth::check();
        echo "
        <script>
            window.opener.postMessage({authorized: $authorized});
            window.close();
        </script>";
    }

    public function generateUsername($first_name, $last_name)
    {
        $i = '';
        $username = strtolower($first_name) . strtolower($last_name);
        while (true) {
            if (! User::where('username', $username)->first()) {
                break;
            }
            $i = $i == '' ? 1 : $i++;
            $username = $username . $i;
        }

        return $username;
    }

    public function createInitialConversations(User $user)
    {
        $support = User::where('role_id', 5)->first();
        $conversation = Conversation::where('user_id', $support->id)->whereHas('members', function ($members) use ($user) {
            $members->where('user_id', $user->id);
        })->has('members', 1)->first();
        if (! $conversation) {
            $conversation = Conversation::create([
                'user_id' => $support->id
            ]);
            ConversationMember::create([
                'conversation_id' => $conversation->id,
                'user_id' => $user->id
            ]);
            Message::create([
                'conversation_id' => $conversation->id,
                'user_id' => $support->id,
                'message' => 'Hi my name is Harry, welcome to telloe.  Take a look around and if you need any help send me a message and I will get back to you as soon as I can',
                'type' => 'text'
            ]);
        }
    }
}