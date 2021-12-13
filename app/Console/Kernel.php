<?php

namespace App\Console;

use App\Http\StripeAPI;
use App\Jobs\SendSMS;
use App\Mail\UpcomingBooking;
use App\Models\Booking;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Log;
use Mail;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function () {
            $this->getUpcomingBookings();
        })->everyFiveMinutes();

        $schedule->call(function () {
            $this->checkSubscriptions();
        })->everyFiveMinutes();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }

    protected function checkSubscriptions()
    {
        $freemiumAccounts = config('app.freemium_accounts');

        User::whereNotIn('email', $freemiumAccounts)
            ->where('trial_expires_at', '<=', Carbon::now())
            ->where('is_premium', true)
            ->update([
                'is_premium' => false
            ]);
        $users = collect(User::has('subscription')->get());
        $users->each(function ($user) use ($freemiumAccounts) {
            $stripe_api = new StripeAPI();
            $subscription = $stripe_api->subscription('retrieve', $user->subscription->stripe_subscription_id);
            $user->is_premium = $subscription->status == 'active' || $subscription->status == 'trialing' || in_array($user->email, $freemiumAccounts);
            $user->save();
        });
    }

    protected function getUpcomingBookings()
    {
        Log::info('[booking_users_notify] CRON job started');
        $now = \Carbon\Carbon::now();
        $bookings = Booking::has('bookingUsers')
            ->with('service.user')
            ->where('date', '>=', $now->format('Y-m-d'))
            ->get();
        foreach ($bookings as $booking) {
            foreach ($booking->bookingUsers as $bookingUser) {
                if ($bookingUser->user && $bookingUser->user->timezone) {
                    $currentNow = \Carbon\Carbon::now($booking->timezone);
                    $bookingStart = Carbon::parse($booking->date . ' ' . $booking->start, $booking->timezone);
                    $diffInMinutes = $currentNow->diffInMinutes($bookingStart, false);
                    if ($diffInMinutes <= 120 && ! $booking->notified_2) { // 2 hours notif
                        $booking->notified_2 = true;
                        $booking->save();
                        if ($booking->service && $booking->service->coach->notify_email) {
                            Mail::to($booking->service->coach->email)->queue(new UpcomingBooking($booking, $booking->service->coach->timezone));
                        }
                        if ($booking->service && $bookingUser->user && $bookingUser->user->notify_email) {
                            Mail::to($bookingUser->user->email)->queue(new UpcomingBooking($booking, $bookingUser->user->timezone));
                        }

                        // SendSMS
                        if ($booking->service && $booking->service->coach->notify_sms && $booking->service->coach->dial_code && $booking->service->coach->phone) {
                            SendSMS::dispatch($booking->service->coach->dial_code . $booking->service->coach->phone, 'You have an upcoming booking in less than 2 hours.');
                        }
                        if ($booking->service && $bookingUser->user && $bookingUser->user->notify_sms && $bookingUser->user->dial_code && $bookingUser->user->phone) {
                            SendSMS::dispatch($bookingUser->user->dial_code . $bookingUser->phone, 'You have an upcoming booking in less than 2 hours.');
                        }
                    } elseif ($diffInMinutes <= 1440 && ! $booking->notified_24 && $diffInMinutes && $diffInMinutes > 120) { // 24 hours notif
                        $booking->notified_24 = true;
                        $booking->save();
                        if ($booking->service && $booking->service->coach->notify_email) {
                            Mail::to($booking->service->coach->email)->queue(new UpcomingBooking($booking, $booking->service->coach->timezone));
                        }
                        if ($booking->service && $bookingUser->user && $bookingUser->user->notify_email) {
                            Mail::to($bookingUser->user->email)->queue(new UpcomingBooking($booking, $bookingUser->user->timezone));
                        }
                    }
                }
            }
        }

        Log::info('[booking_users_notify] CRON job completed.');
    }
}
