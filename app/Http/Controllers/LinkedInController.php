<?php
/**
 * Controller for LinkedIn Integration.
 *
 * PHP version 7.4.27
 *
 * @package    Telloe
 * @category   Controller
 * @author     Welyelf Hisula<welyelf@telloe.com>
 * @copyright  2022 Telloe
 */

namespace App\Http\Controllers;

use App\Jobs\ScrapeLinkedin;
use App\Models\Contact;
use App\Models\LinkedinActivity;
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

    public function feed(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required|exists:users,id',
            'data' => 'required'
        ]);
        $userId = $request->input('user_id');
        foreach ($request->input('data') as $key => $data) {
            if (isset($data['actor'])) {
                $actor = $data['actor'];
                if (isset($data['resharedUpdate'])) {
                    $actor = $data['resharedUpdate']['actor'];
                }
                if ($actor) {
                    LinkedinActivity::disableCache()->updateOrCreate(
                        [
                            'user_id' => $userId,
                            'activity_id' => $data['entityUrn']
                        ],
                        [
                            'data' => $data,
                            'order' => $key
                        ]
                    );

                    if (isset($actor['urn']) && isset($actor['name']['attributes']) && count($actor['name']['attributes']) > 0) {
                        $profile = $actor['name']['attributes'][0]['miniProfile'] ?? $actor['name']['attributes'][0]['miniCompany'];
                        Contact::firstOrCreate(
                            [
                                'user_id' => $userId,
                                'linkedin_urn' => $actor['urn'],
                            ],
                            [
                                'first_name' => $profile['firstName'] ?? $profile['name'],
                                'last_name' => $profile['lastName'] ?? '',
                            ]
                        );
                    }
                }
            }
        }
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
        debounce(new ScrapeLinkedin($authUser), 30);
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
