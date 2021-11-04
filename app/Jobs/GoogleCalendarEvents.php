<?php

namespace App\Jobs;

use App\Http\GoogleCalendarClient;
use App\Models\User;
use Cache;
use Google_Service_Calendar;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class GoogleCalendarEvents implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $user;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        //
        $this->user = $user;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //

        if ($this->user->google_calendar_id && $this->user->google_calendar_token) {
            $events = [];
            $GoogleCalendarClient = new GoogleCalendarClient($this->user);
            $client = $GoogleCalendarClient->client;
            $service = new Google_Service_Calendar($client);
            foreach ($this->user->google_calendar_id as $calendarID) {
                $eventsList = $service->events->listEvents($calendarID);
                while (true) {
                    foreach ($eventsList->getItems() as $event) {
                        if (! isset($event->getExtendedProperties()->private['booking'])) {
                            $events[] = $event;
                        }
                    }
                    $pageToken = $eventsList->getNextPageToken();
                    if ($pageToken) {
                        $optParams = ['pageToken' => $pageToken];
                        $eventsList = $service->events->listEvents($calendarID, $optParams);
                    } else {
                        break;
                    }
                }
            }
            Cache::forever("{$this->user->id}_google_calendar_events", $events);
        }
    }
}
