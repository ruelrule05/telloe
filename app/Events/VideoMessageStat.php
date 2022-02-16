<?php

namespace App\Events;

use App\Models\VideoMessage;
use Auth;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class VideoMessageStat implements ShouldBroadcastNow
{
    use SerializesModels, Dispatchable, InteractsWithSockets;

    protected $videoMessage;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(VideoMessage $videoMessage)
    {
        $this->videoMessage = $videoMessage;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        $authUser = Auth::user();
        return new PrivateChannel("$authUser->id.videoMessages");
    }

    public function broadcastWith()
    {
        return ['videoMessage' => $this->videoMessage->only('id')];
    }
}
