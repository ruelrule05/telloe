<?php
/**
 * Controller for LinkedIn Integration
 *
 * PHP version 7.4.27
 *
 * @package    Telloe
 * @category   Controller
 * @author     Welyelf Hisula<welyelf@telloe.com>
 * @copyright  2022 Telloe
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Socialite;
use GuzzleHttp\Client;
use Config;
use Auth;

class LinkedInController extends Controller
{

    /**
     * This method will redirect the user to the Linkedin authentication page.
     *
     * @return Response
     */
    public function redirect()
    {
        return Socialite::driver('linkedin')->scopes(['r_liteprofile', 'r_emailaddress', 'r_organization_social'])->redirect();

        // $variable = Config::get('services.linkedin');
        // $variable['response_type'] = 'code';

        // $client = new Client();
        // $response = $client->get('https://www.linkedin.com/oauth/v2/authorization', $variable);
        // $result = $response->getBody()->getContents();
        // return $result;
        
    }

    public function callback()
    {
        try {
            //$linkdinUser = Socialite::driver('linkedin')->stateless()->user();
            //$existUser = User::where('email',$linkdinUser->email)->first();
            
            //echo json_encode($linkdinUser,true);

            $variable = Config::get('services.linkedin');

            $client = new Client(['base_uri' => 'https://api.linkedin.com']);
            $access_token = $_GET['code'];

            $req = $client->request('POST', '/oauth/v2/accessToken?grant_type=authorization_code&code='.$access_token.'&client_id='.$variable['client_id'].'&client_secret='.$variable['client_secret'].'&redirect_uri=https://telloe.test/linkedin/callback');
            $result = json_decode($req->getBody());
            print_r($result);
            echo $result->access_token;
            //echo $result


            $access_token = $result->access_token;
            $requestJobs = $client->request('GET', '/v2/shares', [
                'headers' => ["Authorization" => "Bearer " . $access_token ],
                'connection' => 'Keep-Alive'
            ]);
            dd($requestJobs);

            // if($existUser) {
            //     Auth::loginUsingId($existUser->id);
            // }
            // else {
            //     $user = new User;
            //     $user->name = $linkdinUser->name;
            //     $user->email = $linkdinUser->email;
            //     $user->linkedin_id = $linkdinUser->id;
            //     $user->password = md5(rand(1,10000));
            //     $user->save();
            //     Auth::loginUsingId($user->id);
            // }
            //return redirect()->to('/home');
        } 
        catch (Exception $e) {
            return 'error';
        }
    }

    public function getAccessToken()
    {
        echo $_GET['access_token'];
    }
}
