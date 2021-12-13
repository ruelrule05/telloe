<?php

namespace App\Http;

use Auth;
use Illuminate\Http\Request;
use Microsoft\Graph\Graph;
use Microsoft\Graph\Model;

class OutlookClient
{
    public $client;
    public $accessToken;

    public function __construct($user = null)
    {
        $this->client = new \League\OAuth2\Client\Provider\GenericProvider([
            'clientId' => config('oauth.app_id'),
            'clientSecret' => config('oauth.app_password'),
            'redirectUri' => config('oauth.redirect_uri'),
            'urlAuthorize' => config('oauth.authority') . config('oauth.authorize_endpoint'),
            'urlAccessToken' => config('oauth.authority') . config('oauth.token_endpoint'),
            'urlResourceOwnerDetails' => '',
            'scopes' => config('oauth.scopes')
        ]);

        $this->accessToken = $this->getAccessToken($user);
        if (! $this->accessToken) {
            $this->client->authUrl = $this->getSignInUrl();
        }
    }

    public function getAccessToken($user = null)
    {
        // Check if tokens exist
        $authTokens = $user ? $user->outlook_token : Auth::user()->outlook_token;
        if (empty($authTokens['accessToken']) ||
          empty($authTokens['refreshToken']) ||
          empty($authTokens['tokenExpires'])) {
            return '';
        }

        // Check if token is expired
        //Get current time + 5 minutes (to allow for time differences)
        $now = time() + 300;
        if ($authTokens['tokenExpires'] <= $now) {
            echo 'refresh';
            // so let's refresh
            try {
                $newToken = $this->client->getAccessToken('refresh_token', [
                    'refresh_token' => $authTokens['refreshToken'],
                ]);

                $authTokens = $this->saveTokens($newToken, $user);
            } catch (League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) {
                return '';
            }
        }

        // Token is still valid, just return it
        return $authTokens['accessToken'];
    }

    public function getSignInUrl()
    {
        $authUrl = $this->client->getAuthorizationUrl();
        if (! session('oauthState')) {
            session(['oauthState' => $this->client->getState()]);
        }
        return $authUrl;
    }

    public function saveTokens($accessToken, $user = null)
    {
        if (! $user) {
            $user = Auth::user();
        }
        $authTokens = [
            'accessToken' => $accessToken->getToken(),
            'refreshToken' => $accessToken->getRefreshToken(),
            'tokenExpires' => $accessToken->getExpires(),
        ];
        $user->outlook_token = $authTokens;
        $user->save();

        return $authTokens;
    }

    public function callback(Request $request)
    {
        // Validate state
        $expectedState = session('oauthState');
        $request->session()->forget('oauthState');
        $providedState = $request->query('state');
        if (! isset($expectedState)) {
            echo 'No expected state.';
            exit;
            return;
        }

        /*  echo $expectedState .' == '. $providedState;
          if (!isset($providedState) || $expectedState != $providedState) :
              echo 'Invalid auth state.';
              exit;
          endif;*/

        // Authorization code should be in the "code" query param
        $authCode = $request->code;
        if (isset($authCode)) {
            try {
                // Make the token request
                $accessToken = $this->client->getAccessToken('authorization_code', [
                    'code' => $authCode
                ]);
                $graph = new Graph();
                $graph->setAccessToken($accessToken->getToken());

                $this->saveTokens($accessToken);

                $user = $graph->createRequest('GET', '/me')
                    ->setReturnType(Model\User::class)
                    ->execute();
                return $user;
            } catch (League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) {
                echo 'Error requesting token: ' . $e->getMessage();
                return;
            }
        }

        return redirect('/')
          ->with('error', $request->query('error'))
          ->with('errorDetail', $request->query('error_description'));
    }
}
