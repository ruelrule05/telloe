<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use JWTAuth;
use Auth;
use App\Models\User;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Image;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function __construct()
    {
        auth()->setDefaultDriver('api');
    }

    public function login(Request $request)
    {
        if (!$token = auth()->attempt(['email' => $request->email, 'password' => $request->password])) :
            return abort(401, 'Invalid email or password');
        endif;

        return $this->respondWithToken($token);
    }

    public function signup(Request $request) {
        $exists = User::where('email', $request->email)->first();
        if ($exists) return abort(403, 'Email is already registered to another account.');
        $this->validate($request, [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
        ]);
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        $token = JWTAuth::fromUser($user);
        auth()->login($user);
        return $this->respondWithToken($token);
    }


    public function me(Request $request)
    {
        $user = auth()->user();
        if($user) :
            $user->update([
                'last_online' => Carbon::now()
            ]);
        endif;
        $conversations = Conversation::with('messages', 'widget.user', 'members')->where('user_id', $user->id)->get();
        return response()->json($user ? ['user' => $user, 'conversations' => $conversations] : false);
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'user' => auth()->user(),
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }


    public function loginFacebook(Request $request)
    {
        $this->validate($request, [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'id' => 'required'
        ]);
        $user = User::where('email', $request->email)->first();
        if(!$user || $user->facebook_id == $request->id) :
            if(!$user) :
                $time = time();
                $profile_image = 'http://graph.facebook.com/'.$request->id.'/picture?type=normal';
                Image::make($profile_image)->save(public_path('storage/profile-images/' . $time . '.jpeg'));
                $user = User::create([
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'email' => $request->email,
                    'facebook_id' => $request->id,
                    'profile_image' => '/storage/profile-images/' . $time . '.jpeg',
                ]);
            endif;
            $token = auth()->login($user);
            return $this->respondWithToken($token);
        endif;
        return abort(403, "There's no user associated with this Facebook account.");
    }

    public function loginGoogle(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'image_url' => 'required'
        ]);
        $user = User::where('email', $request->email)->first();
        if(!$user || $user->facebook_id == $request->id) :
            if(!$user) :
                $time = time();
                Image::make($request->image_url)->save(public_path('storage/profile-images/' . $time . '.jpeg'));
                $user = User::create([
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'email' => $request->email,
                    'google_id' => $request->id,
                    'profile_image' => '/storage/profile-images/' . $time . '.jpeg',
                ]);
            endif;
            $token = auth()->login($user);
            return $this->respondWithToken($token);
        endif;
        return abort(403, "There's no user associated with this Google account.");
    }
}