<?php

function checkRequestInviteToken(Illuminate\Http\Request $request = null)
{
    if ($request) {
        $request->invite_token ? session()->put('invite_token', $request->invite_token) : session()->forget('invite_token');
        $request->member_invite_token ? session()->put('member_invite_token', $request->member_invite_token) : $request->session()->forget('member_invite_token');
    }

    if (Auth::check()) {
        $user = Auth::user();
        $invite_token = session()->pull('invite_token');
        $member_invite_token = session()->pull('member_invite_token');
        if ($invite_token && $request) {
            $request->invite_token = $invite_token;
            checkInviteToken($user, $request);
        }
        if ($member_invite_token) {
            checkMemberInviteToken($user, $member_invite_token);
        }
    }
}

function countryDialCode($country)
{
    $countryArray = [
        'Andorra' => '+376',
        'United Arab Emirates' => '+971',
        'Afghanistan' => '+93',
        'Antigua And Barbuda' => '+1268',
        'Anguilla' => '+1264',
        'Albania' => '+355',
        'Armenia' => '+374',
        'Netherlands Antilles' => '+599',
        'Angola' => '+244',
        'Antarctica' => '+672',
        'Argentina' => '+54',
        'American Samoa' => '+1684',
        'Austria' => '+43',
        'Australia' => '+61',
        'Aruba' => '+297',
        'Azerbaijan' => '+994',
        'Bosnia And Herzegovina' => '+387',
        'Barbados' => '+1246',
        'Bangladesh' => '+880',
        'Belgium' => '+32',
        'Burkina Faso' => '+226',
        'Bulgaria' => '+359',
        'Bahrain' => '+973',
        'Burundi' => '+257',
        'Benin' => '+229',
        'Saint Barthelemy' => '+590',
        'Bermuda' => '+1441',
        'Brunei Darussalam' => '+673',
        'Bolivia' => '+591',
        'Brazil' => '+55',
        'Bahamas' => '+1242',
        'Bhutan' => '+975',
        'Botswana' => '+267',
        'Belarus' => '+375',
        'Belize' => '+501',
        'Canada' => '+1',
        'Cocos (keeling) Islands' => '+61',
        'Congo, The Democratic Republic Of The' => '+243',
        'Central African Republic' => '+236',
        'Congo' => '+242',
        'Switzerland' => '+41',
        'Cote D Ivoire' => '+225',
        'Cook Islands' => '+682',
        'Chile' => '+56',
        'Cameroon' => '+237',
        'China' => '+86',
        'Colombia' => '+57',
        'Costa Rica' => '+506',
        'Cuba' => '+53',
        'Cape Verde' => '+238',
        'Christmas Island' => '+61',
        'Cyprus' => '+357',
        'Czech Republic' => '+420',
        'Germany' => '+49',
        'Djibouti' => '+253',
        'Denmark' => '+45',
        'Dominica' => '+1767',
        'Dominican Republic' => '+1809',
        'Algeria' => '+213',
        'Ecuador' => '+593',
        'Estonia' => '+372',
        'Egypt' => '+20',
        'Eritrea' => '+291',
        'Spain' => '+34',
        'Ethiopia' => '+251',
        'Finland' => '+358',
        'Fiji' => '+679',
        'Falkland Islands (malvinas)' => '+500',
        'Micronesia, Federated States Of' => '+691',
        'Faroe Islands' => '+298',
        'France' => '+33',
        'Gabon' => '+241',
        'United Kingdom' => '+44',
        'Grenada' => '+1473',
        'Georgia' => '+995',
        'Ghana' => '+233',
        'Gibraltar' => '+350',
        'Greenland' => '+299',
        'Gambia' => '+220',
        'Guinea' => '+224',
        'Equatorial Guinea' => '+240',
        'Greece' => '+30',
        'Guatemala' => '+502',
        'Guam' => '+1671',
        'Guinea-bissau' => '+245',
        'Guyana' => '+592',
        'Hong Kong' => '+852',
        'Honduras' => '+504',
        'Croatia' => '+385',
        'Haiti' => '+509',
        'Hungary' => '+36',
        'Indonesia' => '+62',
        'Ireland' => '+353',
        'Israel' => '+972',
        'Isle Of Man' => '+44',
        'India' => '+91',
        'Iraq' => '+964',
        'Iran, Islamic Republic Of' => '+98',
        'Iceland' => '+354',
        'Italy' => '+39',
        'Jamaica' => '+1876',
        'Jordan' => '+962',
        'Japan' => '+81',
        'Kenya' => '+254',
        'Kyrgyzstan' => '+996',
        'Cambodia' => '+855',
        'Kiribati' => '+686',
        'Comoros' => '+269',
        'Saint Kitts And Nevis' => '+1869',
        'Korea Democratic Peoples Republic Of' => '+850',
        'Korea Republic Of' => '+82',
        'Kuwait' => '+965',
        'Cayman Islands' => '+1345',
        'Kazakstan' => '+7',
        'Lao Peoples Democratic Republic' => '+856',
        'Lebanon' => '+961',
        'Saint Lucia' => '+1758',
        'Liechtenstein' => '+423',
        'Sri Lanka' => '+94',
        'Liberia' => '+231',
        'Lesotho' => '+266',
        'Lithuania' => '+370',
        'Luxembourg' => '+352',
        'Latvia' => '+371',
        'Libyan Arab Jamahiriya' => '+218',
        'Morocco' => '+212',
        'Monaco' => '+377',
        'Moldova, Republic Of' => '+373',
        'Montenegro' => '+382',
        'Saint Martin' => '+1599',
        'Madagascar' => '+261',
        'Marshall Islands' => '+692',
        'Macedonia, The Former Yugoslav Republic Of' => '+389',
        'Mali' => '+223',
        'Myanmar' => '+95',
        'Mongolia' => '+976',
        'Macau' => '+853',
        'Northern Mariana Islands' => '+1670',
        'Mauritania' => '+222',
        'Montserrat' => '+1664',
        'Malta' => '+356',
        'Mauritius' => '+230',
        'Maldives' => '+960',
        'Malawi' => '+265',
        'Mexico' => '+52',
        'Malaysia' => '+60',
        'Mozambique' => '+258',
        'Namibia' => '+264',
        'New Caledonia' => '+687',
        'Niger' => '+227',
        'Nigeria' => '+234',
        'Nicaragua' => '+505',
        'Netherlands' => '+31',
        'Norway' => '+47',
        'Nepal' => '+977',
        'Nauru' => '+674',
        'Niue' => '+683',
        'New Zealand' => '+64',
        'Oman' => '+968',
        'Panama' => '+507',
        'Peru' => '+51',
        'French Polynesia' => '+689',
        'Papua New Guinea' => '+675',
        'Philippines' => '+63',
        'Pakistan' => '+92',
        'Poland' => '+48',
        'Saint Pierre And Miquelon' => '+508',
        'Pitcairn' => '+870',
        'Puerto Rico' => '+1',
        'Portugal' => '+351',
        'Palau' => '+680',
        'Paraguay' => '+595',
        'Qatar' => '+974',
        'Romania' => '+40',
        'Serbia' => '+381',
        'Russian Federation' => '+7',
        'Rwanda' => '+250',
        'Saudi Arabia' => '+966',
        'Solomon Islands' => '+677',
        'Seychelles' => '+248',
        'Sudan' => '+249',
        'Sweden' => '+46',
        'Singapore' => '+65',
        'Saint Helena' => '+290',
        'Slovenia' => '+386',
        'Slovakia' => '+421',
        'Sierra Leone' => '+232',
        'San Marino' => '+378',
        'Senegal' => '+221',
        'Somalia' => '+252',
        'Suriname' => '+597',
        'Sao Tome And Principe' => '+239',
        'El Salvador' => '+503',
        'Syrian Arab Republic' => '+963',
        'Swaziland' => '+268',
        'Turks And Caicos Islands' => '+1649',
        'Chad' => '+235',
        'Togo' => '+228',
        'Thailand' => '+66',
        'Tajikistan' => '+992',
        'Tokelau' => '+690',
        'Timor-leste' => '+670',
        'Turkmenistan' => '+993',
        'Tunisia' => '+216',
        'Tonga' => '+676',
        'Turkey' => '+90',
        'Trinidad And Tobago' => '+1868',
        'Tuvalu' => '+688',
        'Taiwan, Province Of China' => '+886',
        'Tanzania, United Republic Of' => '+255',
        'Ukraine' => '+380',
        'Uganda' => '+256',
        'United States' => '+1',
        'Uruguay' => '+598',
        'Uzbekistan' => '+998',
        'Holy See (vatican City State)' => '+39',
        'Saint Vincent And The Grenadines' => '+1784',
        'Venezuela' => '+58',
        'Virgin Islands, British' => '+1284',
        'Virgin Islands, U.s.' => '+1340',
        'Viet Nam' => '+84',
        'Vanuatu' => '+678',
        'Wallis And Futuna' => '+681',
        'Samoa' => '+685',
        'Kosovo' => '+381',
        'Yemen' => '+967',
        'Mayotte' => '+262',
        'South Africa' => '+27',
        'Zambia' => '+260',
        'Zimbabwe' => '+263',
    ];
    try {
        return $countryArray[$country];
    } catch (Exception $err) {
        return false;
    }
}

function compressVideo($source, $ouput)
{
    $command = config('app.ffmpeg') . ' -y -i ' . $source . ' -crf 23 -preset medium -movflags +faststart -b:a 128k -threads 12 -vcodec libx264 -acodec libmp3lame -b:v 1000k -refs 6 -coder 1 -sc_threshold 40 -flags +loop -me_range 16 -subq 7 -i_qfactor 0.71 -qcomp 0.6 -qdiff 4 -trellis 1 -b:a 128k -vf [in]scale=-2:720,format=yuv420p[out] -pass 1 -strict -2 -passlogfile /tmp/passlogfile ' . $ouput;
    $command .= ' 2>&1';
    //exec($command);
    exec($command, $commandOutput);
    Log::debug('compressVideo command: [' . $command . ']');
    Log::debug('compressVideo: ' . json_encode($commandOutput));
    // print_r($output);
}

function checkInviteToken(App\Models\User $user, $request)
{
    $contact = App\Models\Contact::where('invite_token', $request->invite_token)->where('email', $user->email)->where('is_pending', true)->first();
    if ($contact) {
        $contact->update([
            'contact_user_id' => $user->id,
            'is_pending' => false
        ]);

        broadcast(new App\Events\ContactAcceptedEvent($contact))->toOthers();

        // Create contact of the other person if not existing
        if (! App\Models\Contact::where('user_id', $user->id)->where('contact_user_id', $contact->user_id)->exists()) {
            App\Models\Contact::create([
                'user_id' => $user->id,
                'contact_user_id' => $contact->user_id,
                'email' => $contact->user->email,
                'is_pending' => false
            ]);
        }

        // restore previous conversations
        $conversation = App\Models\Conversation::withTrashed()->where('contact_id', $contact->id)->first();
        if ($conversation) {
            $conversation->restore();
            if (! in_array($user->id, $conversation->members()->pluck('user_id')->toArray())) {
                App\Models\ConversationMember::create([
                    'conversation_id' => $conversation->id,
                    'user_id' => $user->id
                ]);
            }
        }

        if (! $contact->stripe_customer_id) {
            App\Jobs\CreateStripeCustomer::dispatch($contact->user, $contact, $request->all());
        }

        App\Models\Notification::create([
            'user_id' => $contact->user_id,
            'description' => "<strong>{$contact->contactUser->full_name}</strong> has accepted your invitation.",
            'link' => "/dashboard/contacts/$contact->id"
        ]);
    }
}

function checkMemberInviteToken(App\Models\User $user, $member_invite_token)
{
    $member = App\Models\Member::where('invite_token', $member_invite_token)->where('email', $user->email)->where('is_pending', true)->first();
    if ($member) {
        $member->update([
            'member_user_id' => $user->id,
            'is_pending' => false
        ]);
        App\Models\Service::where('member_id', $member->id)->update([
            'user_id' => $user->id
        ]);
        App\Models\Notification::create([
            'user_id' => $member->user_id,
            'description' => "<strong>{$member->memberUser->full_name}</strong> has accepted your member invitation.",
            'link' => "/dashboard/team/members/$member->id"
        ]);
    }
}

function is_base64_encoded($data)
{
    $data = substr($data, strpos($data, 'base64,') + 7);
    return (bool) preg_match('/^[a-zA-Z0-9\/\r\n+]*={0,2}$/', $data);
}

function mime2ext($mime)
{
    $mime_map = [
        'video/3gpp2' => '3g2',
        'video/3gp' => '3gp',
        'video/3gpp' => '3gp',
        'application/x-compressed' => '7zip',
        'audio/x-acc' => 'aac',
        'audio/ac3' => 'ac3',
        'application/postscript' => 'ai',
        'audio/x-aiff' => 'aif',
        'audio/aiff' => 'aif',
        'audio/x-au' => 'au',
        'video/x-msvideo' => 'avi',
        'video/msvideo' => 'avi',
        'video/avi' => 'avi',
        'application/x-troff-msvideo' => 'avi',
        'application/macbinary' => 'bin',
        'application/mac-binary' => 'bin',
        'application/x-binary' => 'bin',
        'application/x-macbinary' => 'bin',
        'image/bmp' => 'bmp',
        'image/x-bmp' => 'bmp',
        'image/x-bitmap' => 'bmp',
        'image/x-xbitmap' => 'bmp',
        'image/x-win-bitmap' => 'bmp',
        'image/x-windows-bmp' => 'bmp',
        'image/ms-bmp' => 'bmp',
        'image/x-ms-bmp' => 'bmp',
        'application/bmp' => 'bmp',
        'application/x-bmp' => 'bmp',
        'application/x-win-bitmap' => 'bmp',
        'application/cdr' => 'cdr',
        'application/coreldraw' => 'cdr',
        'application/x-cdr' => 'cdr',
        'application/x-coreldraw' => 'cdr',
        'image/cdr' => 'cdr',
        'image/x-cdr' => 'cdr',
        'zz-application/zz-winassoc-cdr' => 'cdr',
        'application/mac-compactpro' => 'cpt',
        'application/pkix-crl' => 'crl',
        'application/pkcs-crl' => 'crl',
        'application/x-x509-ca-cert' => 'crt',
        'application/pkix-cert' => 'crt',
        'text/css' => 'css',
        'text/x-comma-separated-values' => 'csv',
        'text/comma-separated-values' => 'csv',
        'application/vnd.msexcel' => 'csv',
        'application/x-director' => 'dcr',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' => 'docx',
        'application/x-dvi' => 'dvi',
        'message/rfc822' => 'eml',
        'application/x-msdownload' => 'exe',
        'video/x-f4v' => 'f4v',
        'audio/x-flac' => 'flac',
        'video/x-flv' => 'flv',
        'image/gif' => 'gif',
        'application/gpg-keys' => 'gpg',
        'application/x-gtar' => 'gtar',
        'application/x-gzip' => 'gzip',
        'application/mac-binhex40' => 'hqx',
        'application/mac-binhex' => 'hqx',
        'application/x-binhex40' => 'hqx',
        'application/x-mac-binhex40' => 'hqx',
        'text/html' => 'html',
        'image/x-icon' => 'ico',
        'image/x-ico' => 'ico',
        'image/vnd.microsoft.icon' => 'ico',
        'text/calendar' => 'ics',
        'application/java-archive' => 'jar',
        'application/x-java-application' => 'jar',
        'application/x-jar' => 'jar',
        'image/jp2' => 'jp2',
        'video/mj2' => 'jp2',
        'image/jpx' => 'jp2',
        'image/jpm' => 'jp2',
        'image/jpeg' => 'jpeg',
        'image/pjpeg' => 'jpeg',
        'application/x-javascript' => 'js',
        'application/json' => 'json',
        'text/json' => 'json',
        'application/vnd.google-earth.kml+xml' => 'kml',
        'application/vnd.google-earth.kmz' => 'kmz',
        'text/x-log' => 'log',
        'audio/x-m4a' => 'm4a',
        'application/vnd.mpegurl' => 'm4u',
        'audio/midi' => 'mid',
        'application/vnd.mif' => 'mif',
        'video/quicktime' => 'mov',
        'video/x-sgi-movie' => 'movie',
        'audio/mpeg' => 'mp3',
        'audio/mpg' => 'mp3',
        'audio/mpeg3' => 'mp3',
        'audio/mp3' => 'mp3',
        'video/mp4' => 'mp4',
        'video/mpeg' => 'mpeg',
        'application/oda' => 'oda',
        'audio/ogg' => 'ogg',
        'video/ogg' => 'ogg',
        'application/ogg' => 'ogg',
        'application/x-pkcs10' => 'p10',
        'application/pkcs10' => 'p10',
        'application/x-pkcs12' => 'p12',
        'application/x-pkcs7-signature' => 'p7a',
        'application/pkcs7-mime' => 'p7c',
        'application/x-pkcs7-mime' => 'p7c',
        'application/x-pkcs7-certreqresp' => 'p7r',
        'application/pkcs7-signature' => 'p7s',
        'application/pdf' => 'pdf',
        'application/octet-stream' => 'pdf',
        'application/x-x509-user-cert' => 'pem',
        'application/x-pem-file' => 'pem',
        'application/pgp' => 'pgp',
        'application/x-httpd-php' => 'php',
        'application/php' => 'php',
        'application/x-php' => 'php',
        'text/php' => 'php',
        'text/x-php' => 'php',
        'application/x-httpd-php-source' => 'php',
        'image/png' => 'png',
        'image/x-png' => 'png',
        'application/powerpoint' => 'ppt',
        'application/vnd.ms-powerpoint' => 'ppt',
        'application/vnd.ms-office' => 'ppt',
        'application/msword' => 'doc',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation' => 'pptx',
        'application/x-photoshop' => 'psd',
        'image/vnd.adobe.photoshop' => 'psd',
        'audio/x-realaudio' => 'ra',
        'audio/x-pn-realaudio' => 'ram',
        'application/x-rar' => 'rar',
        'application/rar' => 'rar',
        'application/x-rar-compressed' => 'rar',
        'audio/x-pn-realaudio-plugin' => 'rpm',
        'application/x-pkcs7' => 'rsa',
        'text/rtf' => 'rtf',
        'text/richtext' => 'rtx',
        'video/vnd.rn-realvideo' => 'rv',
        'application/x-stuffit' => 'sit',
        'application/smil' => 'smil',
        'text/srt' => 'srt',
        'image/svg+xml' => 'svg',
        'application/x-shockwave-flash' => 'swf',
        'application/x-tar' => 'tar',
        'application/x-gzip-compressed' => 'tgz',
        'image/tiff' => 'tiff',
        'text/plain' => 'txt',
        'text/x-vcard' => 'vcf',
        'application/videolan' => 'vlc',
        'text/vtt' => 'vtt',
        'audio/x-wav' => 'wav',
        'audio/wave' => 'wav',
        'audio/wav' => 'wav',
        'application/wbxml' => 'wbxml',
        'audio/webm' => 'webm',
        'video/webm' => 'webm',
        'audio/x-ms-wma' => 'wma',
        'application/wmlc' => 'wmlc',
        'video/x-ms-wmv' => 'wmv',
        'video/x-ms-asf' => 'wmv',
        'application/xhtml+xml' => 'xhtml',
        'application/excel' => 'xl',
        'application/msexcel' => 'xls',
        'application/x-msexcel' => 'xls',
        'application/x-ms-excel' => 'xls',
        'application/x-excel' => 'xls',
        'application/x-dos_ms_excel' => 'xls',
        'application/xls' => 'xls',
        'application/x-xls' => 'xls',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' => 'xlsx',
        'application/vnd.ms-excel' => 'xlsx',
        'application/xml' => 'xml',
        'text/xml' => 'xml',
        'text/xsl' => 'xsl',
        'application/xspf+xml' => 'xspf',
        'application/x-compress' => 'z',
        'application/x-zip' => 'zip',
        'application/zip' => 'zip',
        'application/x-zip-compressed' => 'zip',
        'application/s-compressed' => 'zip',
        'multipart/x-zip' => 'zip',
        'text/x-scriptzsh' => 'zsh',
    ];

    return isset($mime_map[$mime]) === true ? $mime_map[$mime] : false;
}

function formatBytes($size, $precision = 2)
{
    if ($size > 0) {
        $size = (int) $size;
        $base = log($size) / log(1024);
        $suffixes = ['B', 'KB', 'MB', 'GB', 'TB'];

        return round(pow(1024, $base - floor($base)), $precision) . $suffixes[floor($base)];
    } else {
        return $size;
    }
}

function replace_null_with_empty_string($array)
{
    foreach ($array as $key => $value) {
        if (is_array($value)) {
            $array[$key] = replace_null_with_empty_string($value);
        } else {
            if (is_null($value)) {
                $array[$key] = '';
            }
        }
    }
    return $array;
}

function createTZList()
{
    $out = [];
    $tza = timezone_abbreviations_list();
    foreach ($tza as $zone) {
        foreach ($zone as $item) {
            $out[$item['timezone_id']] = 1;
        }
    }
    unset($out['']);
    ksort($out);
    return array_keys($out);
}

function isValidTimezone($tzid)
{
    $valid = [];
    $tza = timezone_abbreviations_list();
    foreach ($tza as $zone) {
        foreach ($zone as $item) {
            $valid[$item['timezone_id']] = true;
        }
    }
    unset($valid['']);
    try {
        return ! ! $valid[$tzid];
    } catch (Exception $e) {
        return false;
    }
    return true;
}

function array_copy($arr)
{
    $newArray = [];
    foreach ($arr as $key => $value) {
        if (is_array($value)) {
            $newArray[$key] = array_copy($value);
        } else {
            if (is_object($value)) {
                $newArray[$key] = clone $value;
            } else {
                $newArray[$key] = $value;
            }
        }
    }
    return $newArray;
}