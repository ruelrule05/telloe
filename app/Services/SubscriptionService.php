<?php

namespace App\Services;

use App\Http\StripeAPI;
use App\Models\Plan;
use App\Models\Subscription;
use Auth;

class SubscriptionService
{
    public static function index()
    {
        return ;
    }

    public static function show($id)
    {
        return ;
    }

    public static function store(Request $request)
    {
        $user = Auth::user();
        if (! $user->subscription) {
            $plan = Plan::findOrFail($request->plan_id);
            if (! $plan->stripe_plan_id) {
                return abort(403, 'This plan has no associated Stripe Plan ID');
            }

            $stripe_api = new StripeAPI();

            // Create Stripe Customer ID if not set
            if (! $user->stripe_customer_id) {
                $customer = $stripe_api->customer('create', ['email' => $user->email]);
                $user->stripe_customer_id = $customer->id;
                $user->save();
            }

            // Add Card to Stripe
            $data = [
                'stripe_customer_id' => $user->stripe_customer_id,
                'card_token' => $request->card_token
            ];
            $stripe_card = $stripe_api->card('create', $data);
            $data = [
                'customer' => $user->stripe_customer_id,
                'plan' => $plan->stripe_plan_id,
            ];
            $stripe_subscription = $stripe_api->subscription('create', $data);
            $subscription = Subscription::create([
                'user_id' => $user->id,
                'stripe_subscription_id' => $stripe_subscription->id,
                'plan_id' => $plan->id,
                'status' => 'active'
            ]);

            return $subscription;
        }

        return abort(403, 'You are already subscribed to a plan.');
    }

    public static function update($id, Request $request)
    {
        return ;
    }

    public static function destroy($id)
    {
        $subscription = Auth::user()->subscription;
        if ($subscription) {
            $stripe_api = new StripeAPI();
            $stripe_subscription = $stripe_api->subscription('cancel', $subscription->stripe_subscription_id);
            $subscription->delete();
            return ['cancelled' => true];
        }
    }
}
