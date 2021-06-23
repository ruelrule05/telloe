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
    private $request;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user, Contact $contact, array $request)
    {
        //
        $this->user = $user;
        $this->contact = $contact;
        $this->request = $request;
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
            $data = [
                'email' => $this->contact->contactUser->email, 
                'name' => $this->contact->contactUser->full_name
            ];
            if (isset($this->request['referral'])) {
                $data['metadata'] = ['referral' => $this->request['referral']];
            }
            $stripeCustomer = $stripe_api->customer('create', $data, ['stripe_account' => $this->user->stripe_account['id']]);
            $this->contact->update([
                'stripe_customer_id' => $stripeCustomer->id,
            ]);
        }

        return $stripeCustomer;
    }
}
