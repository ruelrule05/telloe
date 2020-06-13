<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\Models\Plan;
use App\Models\Subscription;
use App\Http\StripeAPI;

class SubscriptionController extends Controller
{
    public function store(Request $request)
    {
        $this->validate($request, [
            'plan_id' => 'required|exists:plans,id',
            'card_token' => 'required',
        ]);

        $user = Auth::user();
        if (!$user->subscription) :
            $plan = Plan::findOrFail($request->plan_id);
            if (!$plan->stripe_plan_id) return abort(403, 'This plan has no associated Stripe Plan ID');

            $stripe_api = new StripeAPI();

            // Create Stripe Customer ID if not set
            if (!$user->stripe_customer_id) :
                $customer = $stripe_api->customer('create', [ 'email' => $user->email ]);
                $user->update([
                    'stripe_customer_id' => $customer->id
                ]);
            endif;

            // Add Card to Stripe
            $data = [ 
                'stripe_customer_id' => $user->stripe_customer_id,
                'card_token' => $request->card_token
            ];
            $stripe_card = $stripe_api->card('create', $data);
            $data = [ 
                'stripe_customer_id' => $user->stripe_customer_id,
                'plan_id' => $plan->stripe_plan_id,
            ];
            $stripe_subscription = $stripe_api->subscription('create', $data);
            $subscription = Subscription::create([
                'user_id' => $user->id,
                'stripe_subscription_id' => $stripe_subscription->id,
                'plan_id' => $plan->id,
                'status' => 'active'
            ]);

            return response()->json($subscription);
        endif;

        return abort(403, 'You are already subscribed to a plan.');
    }


    public function destroy()
    {	
    	$subscription = Auth::user()->subscription;
        if ($subscription) :
            $stripe_api = new StripeAPI();
            $data = [ 
                'subscription_id' => $subscription->stripe_subscription_id
            ];
            $stripe_subscription = $stripe_api->subscription('cancel', $data);
            $subscription->delete();
            return response()->json(['cancelled' => true]);
        endif;
    }
}
