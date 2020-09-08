<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Models\Booking;
use Carbon\Carbon;
use Mail;
use Modules\Frontend\Mail\UpcomingBooking;
use App\Jobs\SendSMS;

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
            $now = \Carbon\Carbon::now();
            $bookings = Booking::where('date', '>=', $now->format('Y-m-d'))->get();
            foreach($bookings as $booking) :
                $full_name = $booking->user ? $booking->user->full_name : $booking->contact->full_name;
                $diffInMinutes = $now->diffInMinutes(Carbon::parse($booking->date . ' ' . $booking->start), false);
                $actionUrl = config('app.url') . '/dashboard/bookings/calendar?date=' . $booking->date;
                if($diffInMinutes <= 120 && !$booking->notified_2) : // 2 hours notif
                    if($booking->service->user->notify_email) :
                        Mail::to($booking->service->user->email)->queue(new UpcomingBooking($booking, $full_name, $actionUrl));
                    endif;
                    if($booking->user->notify_email) :
                        Mail::to($booking->user->email)->queue(new UpcomingBooking($booking, $booking->service->user->full_name));
                    endif;
                    $booking->notified_2 = true;
                    $booking->save();

                    // SendSMS
                    if($booking->service->user->notify_sms && $booking->service->user->phone && $booking->service->user->dial_code) :
                        SendSMS::dispatch($booking->service->user->dial_code . $booking->service->user->phone, 'You have an upcoming booking in less than 2 hours.');
                    endif;
                    if($booking->user->notify_sms && $booking->user->phone && $booking->user->dial_code) :
                        SendSMS::dispatch($booking->user->dial_code . $booking->user->phone, 'You have an upcoming booking in less than 2 hours.');
                    endif;
                elseif ($diffInMinutes <= 1440 && !$booking->notified_24 && $diffInMinutes && $diffInMinutes > 120) : // 24 hours notif
                    if($booking->service->user->notify_email) :
                        Mail::to($booking->service->user->email)->queue(new UpcomingBooking($booking, $full_name, $actionUrl));
                    endif;
                    if($booking->user->notify_email) :
                        Mail::to($booking->user->email)->queue(new UpcomingBooking($booking, $booking->service->user->full_name));
                    endif;
                    $booking->notified_24 = true;
                    $booking->save();
                endif;
            endforeach;
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
