<?php

namespace App\Console;

use App\Jobs\SendSMS;
use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Log;
use Mail;
use Modules\Frontend\Mail\UpcomingBooking;

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
            Log::info('[booking_users_notify] CRON job started');
            $now = \Carbon\Carbon::now();
            $bookings = Booking::where(function ($query) {
                $query->has('user')->orHas('contact');
            })
                ->with('service.user', 'user', 'contact')
                ->where('date', '>=', $now->format('Y-m-d'))
                ->get();
            foreach ($bookings as $booking) {
                $full_name = $booking->user ? $booking->user->full_name : $booking->contact->full_name;
                $bookingUser = $booking->user ? $booking->user : $booking->contact;
                $bookingStart = Carbon::parse($booking->date . ' ' . $booking->start, $booking->service->coach->timezone ?? null)->timezone($booking->user->timezone ?? null);
                $diffInMinutes = $now->diffInMinutes($bookingStart, false);
                $actionUrl = config('app.url') . '/dashboard/bookings/calendar?date=' . $booking->date;
                if ($diffInMinutes <= 120 && ! $booking->notified_2) { // 2 hours notif
                    $booking->notified_2 = true;
                    $booking->save();
                    if ($booking->service->coach->notify_email) {
                        Mail::to($booking->service->coach->email)->queue(new UpcomingBooking($booking, $full_name));
                    }
                    if ($bookingUser && $bookingUser->notify_email) {
                        Mail::to($bookingUser->email)->queue(new UpcomingBooking($booking, $booking->service->coach->full_name));
                    }

                    // SendSMS
                    if ($booking->service->coach->notify_sms && $booking->service->coach->phone) {
                        SendSMS::dispatch($booking->service->coach->phone, 'You have an upcoming booking in less than 2 hours.');
                    }
                    if ($bookingUser && $bookingUser->notify_sms && $bookingUser->phone) {
                        SendSMS::dispatch($bookingUser->phone, 'You have an upcoming booking in less than 2 hours.');
                    }
                } elseif ($diffInMinutes <= 1440 && ! $booking->notified_24 && $diffInMinutes && $diffInMinutes > 120) { // 24 hours notif
                    $booking->notified_24 = true;
                    $booking->save();
                    if ($booking->service->coach->notify_email) {
                        Mail::to($booking->service->coach->email)->queue(new UpcomingBooking($booking, $full_name));
                    }
                    if ($bookingUser->notify_email) {
                        Mail::to($bookingUser->email)->queue(new UpcomingBooking($booking, $booking->service->coach->full_name));
                    }
                }
            }

            Log::info('[booking_users_notify] CRON job completed.');
        })->everyMinute();
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
}
