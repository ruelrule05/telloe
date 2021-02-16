<?php

namespace App\Http;

use Laravel\Socialite\Facades\Socialite;

class SocialiteHelper
{
    protected static $socialiteDrivers = [
        'facebook' => ['fields' => ['first_name', 'last_name', 'email']], 
        'google' => []
    ];

    public static function getRedirectUrl($driver)
    {
        if (! isset(self::$socialiteDrivers[$driver])) {
            return abort(404);
        }
        return Socialite::driver($driver)->redirect()->getTargetUrl();
    }

    public static function getSocialiteUser($driver)
    {
        if (! isset(self::$socialiteDrivers[$driver])) {
            return abort(404);
        }
        $socialiteUser = null;
        $error = false;
        try {
            $socialiteUser = Socialite::driver($driver);
            if (isset(self::$socialiteDrivers[$driver]['fields'])) {
                $socialiteUser = $socialiteUser->fields(self::$socialiteDrivers[$driver]['fields']);
            }
            $socialiteUser = $socialiteUser->user();
        } catch (\Exception $e) {
            echo $e->getMessage();
            $error = true;
        }
        if ($error) {
            return false;
        }
        return $socialiteUser;
    }
}