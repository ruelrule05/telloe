<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use File;

class publish extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'publish';

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
     * @return mixed
     */
    public function handle()
    {
        //
        $publicFolders = [
            'storage/app/public/inquiry-media',
            'storage/app/public/profile-images',
            'storage/app/public/fb-page-pictures',
            'storage/app/public/sample-images',
            'storage/app/public/message-media',
        ];
        foreach($publicFolders as $folder) :
            if (!File::exists($folder)) File::makeDirectory($folder);
        endforeach;
    }
}
