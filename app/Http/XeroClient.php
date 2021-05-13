<?php

namespace App\Http;

use Auth;
use Calcinai\OAuth2\Client\Provider\Xero;
use Illuminate\Http\Request;
use League\OAuth2\Client\Token\AccessToken;
use XeroPHP\Application;

class XeroClient
{
    public Xero $client;
    public $accessToken;
    public $authUser;
    public $request;
    public Application $application;

    public function __construct(Request $request)
    {
        $this->authUser = Auth::user();
        $this->request = $request;
        $this->client = new Xero([
            'clientId' => config('app.xero_client_id'),
            'clientSecret' => config('app.xero_client_secret'),
            'redirectUri' => config('app.xero_redirect_uri'),
        ]);
        if (! $this->authUser->xero_token) {
            $this->client->authUrl = $this->client->getAuthorizationUrl([
                'scope' => 'offline_access accounting.transactions accounting.contacts accounting.settings'
            ]);
        }
        $this->setAccessToken();
    }

    public function setAccessToken()
    {
        if ($this->request->code) {
            $token = $this->client->getAccessToken('authorization_code', [
                'code' => $this->request->code
            ]);
            $this->authUser->xero_token = $token;
            $this->authUser->save();
            $this->accessToken = $token;
        } elseif ($this->authUser->xero_token) {
            $now = time() + 300;
            if ($this->authUser->xero_token['expires'] <= $now) {
                $newAccessToken = $this->client->getAccessToken('refresh_token', [
                    'refresh_token' => $this->authUser->xero_token['refresh_token']
                ]);
                $this->authUser->xero_token = $newAccessToken;
                $this->authUser->save();
                $this->accessToken = $newAccessToken;
            } else {
                $this->accessToken = new AccessToken($this->authUser->xero_token);
            }
        }
    }

    public function getTenants()
    {
        return $this->client->getTenants($this->accessToken);
    }
}
