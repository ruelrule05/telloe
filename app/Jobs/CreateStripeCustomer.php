<?php

namespace App\Jobs;

use App\Http\StripeAPI;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class CreateStripeCustomer implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $user;
    private $contact;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user, Contact $contact)
    {
        //
        $this->user = $user;
        $this->contact = $contact;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //
        $stripeCustomer = null;
        if ($this->contact->user->stripe_account && ! $this->contact->stripe_customer_id) {
            $stripe_api = new StripeAPI();
            ;
            $data = ['email' => $this->contact->contactUser->email, 'name' => $this->contact->contactUser->full_name];
            $stripeCustomer = $stripe_api->customer('create', $data, ['stripe_account' => $this->user->stripe_account['id']]);
            $this->contact->update([
                'stripe_customer_id' => $stripeCustomer->id,
            ]);
        }

        return $stripeCustomer;
    }
}
