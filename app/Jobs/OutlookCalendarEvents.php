<?php

namespace App\Jobs;

use App\Models\User;
use Cache;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class OutlookCalendarEvents implements ShouldQueue
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

        if ($this->user->outlook_calendar_id && $this->user->outlook_token) {
            $events = [];
            $OutlookClient = new \App\Http\OutlookClient($this->user);
            $graph = new \Microsoft\Graph\Graph();
            $graph->setAccessToken($OutlookClient->accessToken);
            foreach ($this->user->outlook_calendar_id as $calendarID) {
                $getEventsUrl = "/me/calendars/$calendarID/events";
                try {
                    $eventsList = $graph->createRequest('GET', $getEventsUrl)
                    ->setReturnType(\Microsoft\Graph\Model\Event::class)
                    ->execute();
                    foreach ($eventsList as $event) {
                        // $extensionName = config('oauth.graph_extension_name');
                        // $eventExtensionName = '';
                        // $getExtensionUrl = "/me/calendars/$calendarID/events/{$event->getId()}/extensions/$extensionName";
                        // try {
                        //     $eventExtension = $graph->createRequest('GET', $getExtensionUrl)
                        //     ->setReturnType(\Microsoft\Graph\Model\Extension::class)
                        //     ->execute();
                        //     $eventExtensionName = $eventExtension->getProperties()['extensionName'];
                        // } catch (\Exception $e) {
                        // }
                        // if ($eventExtensionName != $extensionName) {
                        //     $events[] = $event;
                        // }
                        $events[] = $event;
                    }
                } catch (\Exception $e) {
                    //echo $e->getResponse()->getBody()->getContents();
                }
            }
            Cache::forever("{$this->user->id}_outlook_calendar_events", $events);
        }
    }
}
