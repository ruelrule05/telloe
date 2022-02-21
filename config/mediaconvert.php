<?php

return [
    'OutputGroups' => [
        0 => [
            'Name' => 'File Group',
            'Outputs' => [
                0 => [
                    'ContainerSettings' => [
                        'Container' => 'MP4',
                        'Mp4Settings' => [
                        ],
                    ],
                    'VideoDescription' => [
                        'CodecSettings' => [
                            'Codec' => 'H_264',
                            'H264Settings' => [
                                'MaxBitrate' => 3000000,
                                'RateControlMode' => 'QVBR',
                                'SceneChangeDetect' => 'TRANSITION_DETECTION',
                            ],
                        ],
                    ],
                    'AudioDescriptions' => [
                        0 => [
                            'AudioSourceName' => 'Audio Selector 1',
                            'CodecSettings' => [
                                'Codec' => 'AAC',
                                'AacSettings' => [
                                    'Bitrate' => 96000,
                                    'CodingMode' => 'CODING_MODE_2_0',
                                    'SampleRate' => 48000,
                                ],
                            ],
                        ],
                    ],
                ],
            ],
            'OutputGroupSettings' => [
                'Type' => 'FILE_GROUP_SETTINGS',
                'FileGroupSettings' => [
                    'Destination' => '',
                    'DestinationSettings' => [
                        'S3Settings' => [
                            'AccessControl' => [
                                'CannedAcl' => 'PUBLIC_READ',
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ],
    'Inputs' => [
        0 => [
            'AudioSelectors' => [
                'Audio Selector 1' => [
                    'DefaultSelection' => 'DEFAULT',
                ],
            ],
            'VideoSelector' => [
            ],
            'TimecodeSource' => 'ZEROBASED',
            'FileInput' => '',
        ],
    ],
];
