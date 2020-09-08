<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Models\Booking;
use Carbon\Carbon;
use Mail;
use Modules\Frontend\Mail\UpcomingBooking;
use App\Jobs\SendSMS;
use Illuminate\Support\Facades\Log;

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
            Log::info('CRON job started.');
            $now = \Carbon\Carbon::now();
            $bookings = Booking::where(function($query) {
                    $query->has('user')->orHas('contact');
                })
                ->with('service.user', 'user', 'contact')
                ->where('date', '>=', $now->format('Y-m-d'))
                ->get();
            foreach($bookings as $booking) :
                $full_name = $booking->user ? $booking->user->full_name : $booking->contact->full_name;
                $bookingUser = $booking->user ? $booking->user : $booking->contact;
                $diffInMinutes = $now->diffInMinutes(Carbon::parse($booking->date . ' ' . $booking->start), false);
                $actionUrl = config('app.url') . '/dashboard/bookings/calendar?date=' . $booking->date;
                if($diffInMinutes <= 120 && !$booking->notified_2) : // 2 hours notif
                    $booking->notified_2 = true;
                    $booking->save();
                    if($booking->service->user->notify_email) :
                        Mail::to($booking->service->user->email)->queue(new UpcomingBooking($booking, $full_name, $actionUrl));
                    endif;
                    if($bookingUser && $bookingUser->notify_email) :
                        Mail::to($bookingUser->email)->queue(new UpcomingBooking($booking, $booking->service->user->full_name));
                    endif;

                    // SendSMS
                    if($booking->service->user->notify_sms && $booking->service->user->phone && $booking->service->user->dial_code) :
                        SendSMS::dispatch($booking->service->user->dial_code . $booking->service->user->phone, 'You have an upcoming booking in less than 2 hours.');
                    endif;
                    if($bookingUser && $bookingUser->notify_sms && $bookingUser->phone && $bookingUser->dial_code) :
                        SendSMS::dispatch($bookingUser->dial_code . $bookingUser->phone, 'You have an upcoming booking in less than 2 hours.');
                    endif;
                elseif ($diffInMinutes <= 1440 && !$booking->notified_24 && $diffInMinutes && $diffInMinutes > 120) : // 24 hours notif
                    $booking->notified_24 = true;
                    $booking->save();
                    if($booking->service->user->notify_email) :
                        Mail::to($booking->service->user->email)->queue(new UpcomingBooking($booking, $full_name, $actionUrl));
                    endif;
                    if($bookingUser->notify_email) :
                        Mail::to($bookingUser->email)->queue(new UpcomingBooking($booking, $booking->service->user->full_name));
                    endif;
                endif;
            endforeach;

            Log::info('CRON job ended.');
        })->everyMinute();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
