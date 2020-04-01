<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use JWTAuth;
use Auth;
use App\Models\User;
use App\Models\Conversation;
use Illuminate\Http\Request;

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
        $convo = Conversation::with('messages.user')->firstOrCreate([
            'widget_id' => $request->widget->id,
            'user_id' => auth()->user()->id
        ]);
        auth()->user()->convo = $convo;
        return response()->json(auth()->user()->load('inquiries', 'offers.member.user') ?? false);
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
            'user' => auth()->user() ? auth()->user()->load('inquiries', 'offers.member.user') : false,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}