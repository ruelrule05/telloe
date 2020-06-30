<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserCustomer;
use App\Models\Conversation;
use App\Models\ConversationMember;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Str;
use Mail;
use Modules\Frontend\Mail\SendInvitation;

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

        if($customer && UserCustomer::where('user_id', Auth::user()->id)->where('customer_id', $customer->id)->first()) return abort(403, "This email is already added");

        $invite_token = '';
        while(true) :
            $invite_token = Str::random(30);
            $exists = UserCustomer::where('invite_token', $invite_token)->first();
            if(!$exists) break;
        endwhile;
        if(UserCustomer::where('user_id', Auth::user()->id)->where('email', $request->email)->first()) return abort(403, 'This customer already exists.');
        $user_customer = UserCustomer::create([
            'user_id' => Auth::user()->id,
            'email' => $request->email,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'customer_id' => $customer->id ?? null,
            'is_pending' => true,
            'invite_token' => $invite_token,
            'blacklisted_services' => $request->blacklisted_services
        ]);
        $user_customer->load('customer');

        $custom_fields = [];
        foreach($request->custom_fields as $custom_field => $value) :
            if($value) $custom_fields[] = [ 'name' => $custom_field, 'value' => $value ];
        endforeach;

        if($customer) :
            $conversation = Conversation::whereHas('members', function($member) use ($customer){
                $member->where('user_id', $customer->id);
            })->has('members', '=', 1)->first();
            if(!$conversation) :
                $conversation = Conversation::create([
                    'user_id' => Auth::user()->id,
                    'custom_fields' => $custom_fields,
                ]);
                ConversationMember::firstOrCreate([
                    'conversation_id' => $conversation->id,
                    'user_id' => $customer->id
                ]);
            endif;
        else :
            $conversation = Conversation::create([
                'user_id' => Auth::user()->id,
                'user_customer_id' => $user_customer->id,
                'custom_fields' => $custom_fields,
            ]);
        endif;

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
