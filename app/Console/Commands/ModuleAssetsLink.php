<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use File;

class ModuleAssetsLink extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'module_assets:link';

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

        /*if (file_exists(public_path('storage'))) {
            return $this->error('The "public/storage" directory already exists.');
        }

        $this->laravel->make('files')->link(
            storage_path('app/public'), public_path('storage')
        );

        $this->info('The [public/storage] directory has been linked.');*/
        $modules = File::directories(base_path().'/Modules');
        foreach($modules as $module) :
            $moduleName = basename($module);
            $targetPath = base_path("/Modules/{$moduleName}/Resources/assets");
            if (!file_exists($targetPath)) :
                $this->laravel->make('files')->link(
                    base_path('resources'), $targetPath
                );
            endif;

        endforeach;
    }
}
