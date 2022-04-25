<?php

namespace App\Console\Commands;

use App\Models\VideoMessage;
use Illuminate\Console\Command;
use Str;

class VideoMessagesSetShort extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'video-messages-set-short';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Updating Video Messages Table...');
        $videoMessages = VideoMessage::where('short_id', '')->get();
        foreach ($videoMessages as $videoMessage) {
            $shortId = $videoMessage->user_id .Str::random(6);
            while (VideoMessage::where('short_id', $shortId)->exists()) {
                $shortId = $videoMessage->user_id->id . Str::random(6);
            }
            $videoMessage->update([
                'short_id' => $shortId
            ]);
        }
    }
}
