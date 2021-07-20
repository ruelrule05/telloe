<?php

namespace App\Console\Commands;

use App\Models\Service;
use Illuminate\Console\Command;

class BookingsSetName extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bookings-set-name';

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
        $this->info('Updating Bookings Table...');
        $services = Service::with('bookings')->get();
        foreach ($services as $service) {
            $service->bookings()->where(function ($query) {
                $query->where('name', '')->orWhereNull('name');
            })->update(['name' => $service->name]);
        }
    }
}
