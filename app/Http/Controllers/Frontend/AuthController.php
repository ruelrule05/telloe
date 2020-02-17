<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\PasswordReset;
use App\Models\Inquiry;
use App\Models\Booking;
use App\Models\Widget;
use Illuminate\Support\Str;
use Auth;
use Mail;

class AuthController extends Controller
{
    public function get(Request $request)
    {
        $user = Auth::check() ? Auth::user()->load('widget.widgetRules', 'subscription') : false;
        return response()->json($user);
    }

    public function login(Request $request) {
        if ($request->isMethod('post')) :
            $user = User::where('email', $request->email)->first();
            if (!$user):
                return abort(403, 'Email does not exists in our records');
            else :
                if (Auth::attempt(['email' => $request->email, 'password' => $request->password])):
                    $response = [
                        'redirect_url' => $request->redirect ?? redirect()->back()->getTargetUrl(),
                    ]; 
                    return response()->json($response);
                else:
                    return abort(403, 'Invalid password');
                endif;
            endif;
        endif;

    	return view('frontend.auth.login');
    }


    public function signup(Request $request) {
    	if ($request->isMethod('post')) :
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
    		Auth::login($user);
            Widget::firstOrCreate([
                'user_id' => $user->id
            ]);
            
    		return response()->json($user);
    	endif;

    	return view('frontend.auth.signup');
    }


    public function logout() {
        Auth::logout();
        return redirect('/login');
    }



    public function recover(Request $request) {
        if ($request->isMethod('post')) :
            $user = User::where('email', $request->email)->first();
            if ($user):
                while (true):
                    $token = Str::random(30);
                    $exists = PasswordReset::where('token', $token)->first();
                    if (!$exists) break;
                endwhile;

                $passwordReset = PasswordReset::updateOrcreate(
                    ['email' => $request->email],
                    ['token' => $token]
                );

                // send email
                //Mail::to($passwordReset->email)->queue(new \App\Mail\SendPasswordReset($passwordReset));

                return response()->json(['success' => true]); 
            else:
                return abort(404, 'We could not find the email address in our records');
            endif;
        endif;

        return view('frontend.auth.recover');
    }

    public function reset(Request $request) {
        $token = $request->token;
        $passwordReset = PasswordReset::where('token', $token)->firstOrfail();

        if ($request->isMethod('post')) :
            $this->validate($request, [
                'password' => 'required|max:100'
            ]);
            if ($request->password != $request->password_confirmation) return abort(422, 'The passwords does not match');
            $user = User::where('email', $passwordReset->email)->first();
            if ($user):
                $user->update([
                    'password' => bcrypt($request->password)
                ]);
                $passwordReset->delete();

                return response()->json(['success' => true]); 
            else:
                return abort(404, 'The email associated with this reset token does not exist anymore.');
            endif;
        endif;

        return view('frontend.auth.reset');
    }


    public function reports() {
        $reports = [];
        $reports['inquiries'] = Inquiry::all()->count();
        $reports['bookings'] = Booking::all()->count();

        return response()->json($reports);
    }


    public function FBMessengerWebhook(Request $request)
    {
        echo $request->challenge;
        $data = json_encode($request->all());
        Mail::raw($data, function($message) {
           $message->subject('message subject')->to('cleidoscope@gmail.com');
        });
    }

    public function update(Request $request)
    {
        $this->validate($request, [
            'first_name' => 'nullable',
            'last_name' => 'required',
            'email' => 'required|email',
        ]);
        $emailExists = User::where('email', $request->email)->where('id', '<>', Auth::user()->id)->first();
        if($emailExists) return abort(403, 'Email already exists.');

        Auth::user()->update($request->all());
        return $this->get($request);
    }
}
