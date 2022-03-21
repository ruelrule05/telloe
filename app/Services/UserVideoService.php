<?php

namespace App\Services;

use App\Models\UserVideo;
use App\Models\VideoMessageVideo;
use Auth;
use Aws\MediaConvert\MediaConvertClient;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;

class UserVideoService
{
    use ValidatesRequests;

    public static function index(Request $request)
    {
        return response()->json(Auth::user()->videos);
    }

    public static function store(Request $request)
    {
        (new self)->validate($request, [
            'source' => 'nullable|string|max:255',
            'gif' => 'nullable|string|max:255',
            'thumbnail' => 'nullable|string|max:255',
            'duration' => 'required|integer',
        ]);

        $authUser = Auth::user();
        $data = $request->only('source','gif', 'thumbnail', 'duration');
        $data['user_id'] = $authUser->id;
        $userVideo = UserVideo::create($data);

        /* Mediaconvert */
        $bucket = config('aws.s3.bucket');
        $mediaConvertClient = new MediaConvertClient([
            'version' => config('aws.mediaconvert.version'),
            'region' => config('aws.s3.region'),
            'endpoint' => config('aws.mediaconvert.url')
        ]);
        $role = config('aws.s3.iam_arn');
        $queue = config('aws.s3.queue_arn');
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

        return response()->json($userVideo);
    }

    public static function destroy(UserVideo $userVideo)
    {
        VideoMessageVideo::where('user_video_id', $userVideo->id)->delete();
        UserVideo::where('id', $userVideo->id)->delete();
        return response()->json(['deleted' => $userVideo->delete()]);
    }

    public function update(Request $request, UserVideo $userVideo)
    {
        $this->authorize('update', $userVideo);
        $userVideo->update($request->only('tags'));
        return response()->json(['updated' => '']);
    }
}
