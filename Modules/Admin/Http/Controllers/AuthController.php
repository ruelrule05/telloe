<?php

namespace Modules\Admin\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    // Attempt login
    public function store(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->whereHas('role', function ($role) {
            $role->where('role', 'administrator');
        })->first();
        if (! $user) {
            return redirect()->back()->withInput()->withErrors(['auth_error' => 'Email does not exists in our records.']);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            return redirect()->back();
        } else {
            return redirect()->back()->withInput()->withErrors(['auth_error' => 'Wrong password.']);
        }
    }

    // Logout user
    public function logout()
    {
        UserActivity::create([
            'user_id' => Auth::user()->id,
            'activity' => 'Logged out'
        ]);
        Auth::logout();
        return redirect(url(''));
    }
}
