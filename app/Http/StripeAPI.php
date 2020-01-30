<?php
namespace App\Http;

use Stripe\Stripe;
use App\Modules\Stripe\Config\StripeConfig;
use DB;


class StripeAPI
{
    protected $secret_key;
    protected $product_id;
    protected $currency = 'USD';
    protected $referral_coupon = 'rIBzd73u';


    public function __construct($secret_key = '')
    {
        $this->secret_key = config('stripe.secret_key');
        $this->product_id = config('stripe.product_id');

        if( !empty( $secret_key ) ) $this->secret_key = $secret_key;

        Stripe::setApiKey($this->secret_key);
    }


    // Card methods
    public function card( $action, $params = [] )
    {

        switch( $action ) :

            case 'create' :
                $customer = \Stripe\Customer::retrieve($params['stripe_customer_id']);
                $card = $customer->sources->create([ 'source' => $params['card_token'] ]);
                return $card;
                break;


            case 'retrieve' :
                break;


            case 'update' :
                break;


            case 'delete' :
                $customer = \Stripe\Customer::retrieve($params['stripe_customer_id']);
                $customer->sources->retrieve( $params['card_token'] )->delete();
                break;


            case 'list' :
                break;

        endswitch;
    }




    // Customer methods
    public function customer( $action, $params = [] )
    {
        switch( $action ) :

            case 'retrieve' :
                $customer = \Stripe\Customer::retrieve($params['stripe_customer_id']);
                return $customer;
                break;

            case 'create' :
                $customer = \Stripe\Customer::create([
                    'email' => $params['email']
                ]);
                return $customer;
                break;

        endswitch;
    }




    // Plan methods
    public function plan( $action, $params = [] )
    {
        switch( $action ) :

            case 'retrieve' :
                $plan = \Stripe\Plan::retrieve($params['stripe_plan_id']);
                return $plan;
                break;

            case 'create' :
                $plan = \Stripe\Plan::create(array(
                    'nickname' => $params['nickname'],
                    'amount' => $params['amount'],
                    'interval' => 'month',
                    'product' => $this->product_id,
                    'currency' => $this->currency
                ));

                return $plan;
                break;


            case 'update' :
                $plan = \Stripe\Plan::retrieve($params['stripe_plan_id']);
                $plan->nickname = $params['nickname'];
                $plan->save();

                return $plan;
                break;

        endswitch;
    }





    // Subscription method
    public function subscription( $action, $params = [] )
    {
        switch( $action ) :

            case 'create' :
                $subscription = \Stripe\Subscription::create(array(
                  'customer' => $params['stripe_customer_id'],
                  'items' => [
                    [
                        'plan' => $params['plan_id'],
                    ],
                  ]
                ));
                return $subscription;
                break;

            case 'cancel' :
                $subscription = \Stripe\Subscription::retrieve($params['subscription_id']);
                $subscription->cancel();
                break;

            case 'apply_referral_coupon' :
                $subscription = \Stripe\Subscription::retrieve($params['subscription_id']);
                $subscription->coupon = $this->referral_coupon;
                $subscription->save();
                break;

        endswitch;
    }




    // Product method
    public function product( $action, $params = [] )
    {
        switch( $action ) :

            case 'retrieve' :
                $product = \Stripe\Product::retrieve($params['product_id']);
                return $product;
                break;

        endswitch;
    }


}