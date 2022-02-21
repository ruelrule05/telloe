<?php

return [
    's3' => [
        'bucket' => env('AWS_BUCKET'),
        'pool_id' => env('AWS_POOL_ID'),
        'region' => env('AWS_DEFAULT_REGION'),
        'iam_arn' => env('AWS_IAM_ARN'),
        'queue_arn' => env('AWS_QUEUE_ARN'),
    ],
    'mediaconvert' => [
        'version' => 'latest',
        'url' => env('AWS_MEDIACONVERT_ACCOUNT_URL'),
        'verification_token' => env('MEDIACONVERT_VERIFICATION_TOKEN')
    ]
];
