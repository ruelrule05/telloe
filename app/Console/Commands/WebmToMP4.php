<?php

namespace App\Console\Commands;

use App\Models\UserVideo;
use Aws\MediaConvert\MediaConvertClient;
use Illuminate\Console\Command;

class ConversationSetSlug extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'webm-to-mp4';

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
        $bucket = config('aws.s3.bucket');

        /* Mediaconvert */
        $mediaConvertClient = new MediaConvertClient([
            'version' => config('aws.mediaconvert.version'),
            'region' => config('aws.s3.region'),
            'endpoint' => config('aws.mediaconvert.url')
        ]);
        $role = config('aws.s3.iam_arn');
        $queue = config('aws.s3.queue_arn');

        foreach (UserVideo::cursor() as $userVideo) {
            $path = parse_url($userVideo->source)['path'];
            $destination = pathinfo($path)['dirname'];
            $destination = str_replace("/$bucket/", '', $destination);
            $source = $destination . '/' . basename($userVideo->source);

            $settings = config('mediaconvert');
            $settings['Inputs'][0]['FileInput'] = "s3://$bucket/$source";
            $settings['OutputGroups'][0]['OutputGroupSettings']['FileGroupSettings']['Destination'] = "s3://$bucket/$destination/";
            try {
                $mediaConvertClient->createJob([
                    'Role' => $role,
                    'Settings' => $settings,
                    'Queue' => $queue,
                    'UserMetadata' => [
                        'Customer' => 'Amazon',
                        'userVideoId' => $userVideo->id
                    ],
                ]);
            } catch (AwsException $e) {
                echo $e->getMessage();
            }
        }
    }
}
