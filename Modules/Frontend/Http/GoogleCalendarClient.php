<?php
namespace Modules\Frontend\Http;

use Google_Client;
use Google_Service_Calendar;
use Auth;

class GoogleCalendarClient {
	public $client;

	public function __construct()
	{
        $client = new Google_Client();
        $client->setApplicationName('Google Calendar API PHP Quickstart');
        $client->setScopes([Google_Service_Calendar::CALENDAR_READONLY, Google_Service_Calendar::CALENDAR_EVENTS]);
        $client->setAuthConfig(config_path('credentials.json'));
        $client->setAccessType('offline');
        $client->setPrompt('select_account consent');
        $client->setRedirectUri(route('googlecalendarcallback'));

        // get user token
        $authToken = Auth::user()->google_calendar_token;
        if($authToken) :
            $client->setAccessToken($authToken);
        endif;

         if ($client->isAccessTokenExpired()) :
            // Refresh the token if possible, else fetch a new one.
            if ($client->getRefreshToken()) :
                $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
            else :
                $client->authUrl = $client->createAuthUrl();
            endif;

        endif;
        $this->client = $client;
	}

    public function setAccessToken($authCode)
    {
        // Exchange authorization code for an access token.
        $accessToken = $this->client->fetchAccessTokenWithAuthCode($authCode);
        $this->client->setAccessToken($accessToken);
        // Check to see if there was an error.
        if (array_key_exists('error', $accessToken)) :
            throw new Exception(join(', ', $accessToken));
        endif;

        $user = Auth::user();
        $user->google_calendar_token = $this->client->getAccessToken();
        $user->save();
    }
}