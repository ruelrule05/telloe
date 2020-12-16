<?php

namespace Modules\Frontend\Events;

use App\Models\Message;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewMessageEvent implements ShouldBroadcastNow
{
    use SerializesModels, Dispatchable, InteractsWithSockets;

    protected $message;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [
            new PresenceChannel("conversations.{$this->message->conversation_id}"),
            new PrivateChannel('AppChannel'),
        ];
    }

    public function broadcastWith()
    {
        return ['message' => $this->message->only('id', 'conversation_id', 'timestamp')];
    }
}
