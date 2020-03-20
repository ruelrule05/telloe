<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
        'App\Models\Offer' => 'App\Policies\OfferPolicy',
        'App\Models\Inquiry' => 'App\Policies\InquiryPolicy',
        'App\Models\Message' => 'App\Policies\MessagePolicy',
        'App\Models\Chatbot' => 'App\Policies\ChatbotPolicy',
        'App\Models\Chatbox' => 'App\Policies\ChatboxPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
