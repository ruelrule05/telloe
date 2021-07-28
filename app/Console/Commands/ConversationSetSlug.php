<?php

namespace App\Console\Commands;

use App\Models\Conversation;
use Illuminate\Console\Command;
use Str;

class ConversationSetSlug extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'conversations-set-slug';

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
        $this->info('Updating Conversations...');
        $conversations = Conversation::whereNull('slug')->orWhere('slug', '')->get();
        foreach ($conversations as $conversation) {
            $slug = Str::random(32);
            while (Conversation::where('slug', Str::random(32))->exists()) {
                $slug = Str::random(32);
            }
            $conversation->update([
                'slug' => $slug
            ]);
        }
    }
}
