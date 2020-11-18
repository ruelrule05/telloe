<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\Request;
use Modules\Frontend\Http\XeroClient;

class XeroController extends Controller
{
    //

    public function getToken()
    {
        return response(Auth::user()->xero_token ? 1 : 0);
    }

    public function authenticate(Request $request)
    {
        $XeroClient = new XeroClient($request);
        session(['oauth2state' => $XeroClient->client->getState()]);
        return response()->json($XeroClient->client);
    }

    public function callback(Request $request)
    {
        if (! $request->code) {
            return;
        }
        $oauth2state = session('oauth2state');
        if (! $request->state || $request->state !== $oauth2state) {
            $request->session()->forget('oauth2state');
            return;
        }
        $XeroClient = new XeroClient($request);
        echo '
            <script>
                window.close();
            </script>';

        return;
    }

    public function tenants(Request $request)
    {
        $XeroClient = new XeroClient($request);
        $tenants = $XeroClient->getTenants();

        return response($tenants);
    }

    public function saveTenant(Request $request)
    {
        $this->validate($request, [
            'tenant_id' => 'required|string'
        ]);
        $authUser = Auth::user();
        $authUser->xero_tenant_id = $request->tenant_id;
        $authUser->save();

        return response($authUser->xero_tenant_id);
    }

    public function invoices(Request $request)
    {
        $authUser = Auth::user();
        $invoices = [];

        if ($authUser->xero_tenant_id) {
            $XeroClient = new XeroClient($request);
            $xero = new \XeroPHP\Application($XeroClient->accessToken, $authUser->xero_tenant_id);
            $invoices = $xero->load(\XeroPHP\Models\Accounting\Invoice::class)->execute();
        }

        return response(json_decode(json_encode($invoices), true));
    }

    public function remove()
    {
        $authUser = Auth::user();
        $authUser->xero_token = null;
        $authUser->xero_tenant_id = null;
        $authUser->save();
        return response(['removed' => true]);
    }
}
