<?php

namespace App\Services;

use App\Http\StripeAPI;
use App\Mail\Subscribed;
use App\Models\Plan;
use App\Models\Subscription;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Mail;

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
                $data = ['email' => $user->email];
                if ($request->referral) {
                    $data['metadata'] = ['referral' => $request->referral];
                }
                $customer = $stripe_api->customer('create', $data);
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
            $data['trial_end'] = 'now';
            $trialExpiresAt = null;
            // if ($user->has_subscribed) {
            //     $data['trial_end'] = 'now';
            // } else {
            //     $trialExpiresAt = Carbon::now()->add(14, 'day');
            //     $data['trial_period_days'] = 14;
            // }
            $stripe_subscription = $stripe_api->subscription('create', $data);
            $subscription = Subscription::create([
                'user_id' => $user->id,
                'stripe_subscription_id' => $stripe_subscription->id,
                'plan_id' => $plan->id,
                'status' => 'active',
                'trial_expires_at' => $trialExpiresAt
            ]);

            $user->has_subscribed = true;
            $user->is_premium = true;
            $user->save();

            Mail::to($user->email)->queue(new Subscribed($plan));
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
