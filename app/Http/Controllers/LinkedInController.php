<?php
/**
 * Controller for LinkedIn Integration.
 *
 * PHP version 7.4.27
 *
 * @package    Telloe
 * @category   Controller
 *
 * @author     Welyelf Hisula<welyelf@telloe.com>
 * @copyright  2022 Telloe
 */

namespace App\Http\Controllers;

use Auth;
use Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class LinkedInController extends Controller
{
    /**
     * This method will redirect the user to the Linkedin authentication page.
     *
     * @return Response
     */
    public function authenticate()
    {
        $redirectUrl = 'https://www.linkedin.com/oauth/v2/authorization';
        $redirectUrl .= '?client_id=' . config('services.linkedin.client_id');
        $redirectUrl .= '&redirect_uri=' . urlencode(config('services.linkedin.integration_redirect'));
        $redirectUrl .= '&scope=r_basicprofile+r_emailaddress';
        $redirectUrl .= '&response_type=code';

        return response()->json([
            'authUrl' => $redirectUrl
        ]);
    }

    public function callback(Request $request)
    {
        try {
            $config = Config::get('services.linkedin');
            $code = $request->input('code');
            $response = Http::post('https://api.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=' . $code . '&client_id=' . $config['client_id'] . '&client_secret=' . $config['client_secret'] . '&redirect_uri=' . $config['integration_redirect']);

            $data = $response->json();

            $me = Http::withHeaders([
                'Authorization' => 'Bearer ' . $data['access_token'],
            ])->get('https://api.linkedin.com/v2/me');

            Auth::user()->update([
                'linkedin_username' => $me->json()['vanityName'],
                'linkedin_token' => $data,
            ]);

            return redirect()->to('/dashboard/integrations');
        } catch (Exception $e) {
            return 'error';
        }
    }

    public function index()
    {
        $authUser = Auth::user();
        return response()->json($authUser->linkedinActivities);
    }

    public function getUser(String $urn)
    {
        $authUser = Auth::user();
        if (! $authUser->linkedin_token) {
            return abort(403, 'LinkedIn not integrated.');
        }
        $memberId = str_replace('urn:li:member:', '', $urn);
        $user = Http::withHeaders([
            'Authorization' => 'Bearer ' . $authUser->linkedin_token['access_token'],
            'X-RestLi-Protocol-Version' => '2.0.0'
        ])->get('https://api.linkedin.com/v2/people/(id:' . $memberId . ')');
        return response()->json($user->json());
    }
}
