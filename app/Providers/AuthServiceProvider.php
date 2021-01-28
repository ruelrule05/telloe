<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

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
        'App\Models\Conversation' => 'App\Policies\ConversationPolicy',
        'App\Models\Note' => 'App\Policies\NotePolicy',
        'App\Models\ConversationMember' => 'App\Policies\ConversationMemberPolicy',
        'App\Models\Booking' => 'App\Policies\BookingPolicy',
        'App\Models\Service' => 'App\Policies\ServicePolicy',
        'App\Models\Contact' => 'App\Policies\ContactPolicy',
        'App\Models\Member' => 'App\Policies\MemberPolicy',
        'App\Models\PendingSubscription' => 'App\Policies\PendingSubscriptionPolicy',
        'App\Models\PendingInvoice' => 'App\Policies\PendingInvoicePolicy',
        'App\Models\Notification' => 'App\Policies\NotificationPolicy',
        'App\Models\BookingLink' => 'App\Policies\BookingLinkPolicy',
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
