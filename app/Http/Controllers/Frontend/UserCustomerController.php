<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserCustomer;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Str;
use Mail;
use App\Mail\SendInvitation;

class UserCustomerController extends Controller
{
    public function index()
    {
        $user_customers = UserCustomer::with('customer')->where('user_id', Auth::user()->id)->orderBy('created_at', 'DESC')->get();
        return response()->json($user_customers);
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email'
        ]);

        if($request->email == Auth::user()->email) return abort(403, "Can't add your own email as customer");

        $authTab = 'login';
        $customer = User::where('email', $request->email)->first();
        if(!$customer) $authTab = 'signup';

        if($customer && UserCustomer::where('customer_id', $customer->id)->first()) return abort(403, "This email is already added");

        $invite_token = '';
        while(true) :
            $invite_token = Str::random(30);
            $exists = UserCustomer::where('invite_token', $invite_token)->first();
            if(!$exists) break;
        endwhile;
        $user_customer = UserCustomer::create([
            'user_id' => Auth::user()->id,
            'email' => $request->email,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'customer_id' => $customer->id ?? null,
            'is_pending' => true,
            'invite_token' => $invite_token,
        ]);
        $user_customer->load('customer');

        Mail::to($user_customer->email)->queue(new SendInvitation($user_customer, $authTab));
        return response()->json($user_customer);

    }


    public function update(Request $request, UserCustomer $userCustomer)
    {
    }


    public function destroy(UserCustomer $userCustomer)
    {
        $this->authorize('delete', $userCustomer);
        return response()->json(['deleted' => $userCustomer->delete()]);
    }
}
