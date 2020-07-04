<?php
namespace App\Http;

use Stripe\Stripe;

class StripeAPI
{
    protected $secret_key;
    protected $product_id;
    protected $currency = 'USD';
    protected $referral_coupon = 'rIBzd73u';


    public function __construct()
    {
        $this->secret_key = config('stripe.secret_key');

        Stripe::setApiKey($this->secret_key);
    }

    // Invoice item methods
    public function invoiceItem( $action, $params )
    {
        switch( $action ) :
            case 'create' :
                $invoiceItem = \Stripe\InvoiceItem::create($params);
                return $invoiceItem;
                break;


        endswitch;
    }


    // Invoice methods
    public function invoice( $action, $params )
    {
        switch( $action ) :
            case 'create' :
                $invoice = \Stripe\Invoice::create($params);
                return $invoice;
                break;

            case 'retrieve' :
                $invoice = \Stripe\Invoice::retrieve($params);
                return $invoice;
                break;
        endswitch;
    }


    // Account methods
    public function account( $action, $params )
    {
        switch( $action ) :
            case 'create' :
                $account = \Stripe\Account::create($params);
                return $account;
                break;

            case 'retrieve' :
                $account = \Stripe\Account::retrieve($params);
                return $account;
                break;

            case 'update' :
                $id = $params['id'];
                unset($params['id']);
                $account = \Stripe\Account::update($id, $params);
                return $account;
                break;

            case 'delete' :
                $account = \Stripe\Account::retrieve($params);
                $account->delete();
                return $account;
                break;
        endswitch;
    }


    // Customer methods
    public function customer( $action, $params )
    {
        switch( $action ) :

            case 'retrieve' :
                $customer = \Stripe\Customer::retrieve($params);
                return $customer;
                break;

            case 'create' :
                $customer = \Stripe\Customer::create($params);
                return $customer;
                break;

        endswitch;
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
    public function subscription( $action, $params )
    {
        switch( $action ) :

            case 'create' :
                $subscription = \Stripe\Subscription::create($params);
                return $subscription;
                break;

            case 'cancel' :
                $subscription = \Stripe\Subscription::retrieve($params['subscription_id']);
                $subscription->delete();
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

            case 'create' :
                $product = \Stripe\Product::create($params);
                return $product;
                break;

            case 'retrieve' :
                $product = \Stripe\Product::retrieve($params['product_id']);
                return $product;
                break;

        endswitch;
    }


    // Price method
    public function price( $action, $params = [] )
    {
        switch( $action ) :
            case 'create' :
                $price = \Stripe\Price::create($params);
                return $price;
                break;
        endswitch;
    }



}