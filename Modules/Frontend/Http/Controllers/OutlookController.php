<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Auth;
use Illuminate\Http\Request;
use Modules\Frontend\Http\OutlookClient;

class OutlookController extends Controller
{
    public function getToken() {
        return response(Auth::user()->outlook_token ? 1 : 0);
    }
   
    public function callback(Request $request)
    {
        $OutlookClient = new OutlookClient();
        $user = $OutlookClient->callback($request);
        echo '
            <script>
                window.close();
            </script>';

        return;
    }

    public function remove()
    {
        $authUser = Auth::user();
        $authUser->outlook_token = null;
        $authUser->save();
        return response(['removed' => true]);
    }
    
    public function getClient()
    {
        $OutlookClient = new \Modules\Frontend\Http\OutlookClient();
        return response()->json($OutlookClient->client);
    }

}