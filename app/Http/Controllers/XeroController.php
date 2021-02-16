<?php

namespace App\Http\Controllers;


use App\Models\Contact;
use Auth;
use Illuminate\Http\Request;
use App\Http\XeroClient;

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

        $tenantId = $request->tenantId ?? $authUser->xero_tenant_id;
        if ($authUser->xero_tenant_id) {
            $XeroClient = new XeroClient($request);
            $xero = new \XeroPHP\Application($XeroClient->accessToken, $tenantId);
            $invoices = $xero->load(\XeroPHP\Models\Accounting\Invoice::class)
                ->orderBy('Date', 'DESC')
                ->where('Status', 'DRAFT')
                ->orWhere('Status', 'SUBMITTED')
                ->orWhere('Status', 'AUTHORISED')
                ->execute();
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

    public function storeInvoice(Request $request)
    {
        $this->validate($request, [
            'contact_id' => 'required|exists:contacts,id',
            'service_ids' => 'nullable|array',
            'amount' => 'required|numeric',
            'currency' => 'required|min:3|max:3',
        ]);
        $authUser = Auth::user();

        if (! $authUser->xero_tenant_id) {
            return abort(403, 'No tenant selected');
        }

        $contact = Contact::where('id', $request->contact_id)->where('user_id', $authUser->id)->firstOrFail();

        $XeroClient = new XeroClient($request);
        $xero = new \XeroPHP\Application($XeroClient->accessToken, $authUser->xero_tenant_id);
        $xeroContact = null;
        if ($contact->xero_guid) {
            try {
                $xeroContact = $xero->loadByGUID(\XeroPHP\Models\Accounting\Contact::class, $contact->xero_guid);
            } catch (\Exception $e) {
            }
        }
        if (! $xeroContact) {
            $xeroContact = $xero->load(\XeroPHP\Models\Accounting\Contact::class)->where('Name', $contact->contactUser->full_name)->first();
            if (! $xeroContact) {
                $xeroContact = new \XeroPHP\Models\Accounting\Contact($xero);
                $xeroContact->setName($contact->contactUser->full_name);
                $xeroContact->setFirstName($contact->contactUser->first_name);
                $xeroContact->setLastName($contact->contactUser->last_name);
                $xeroContact->setEmailAddress($contact->contactUser->email);
                $xeroContact->save();
            }

            $contact->update([
                'xero_guid' => $xeroContact->getGUID()
            ]);
        }

        $xeroCurrency = $xero->load(\XeroPHP\Models\Accounting\Currency::class)->where('code', $request->currency)->first();

        if (! $xeroCurrency) {
            $xeroCurrency = new \XeroPHP\Models\Accounting\Currency($xero);
            $xeroCurrency->setCode($request->currency);
            $xeroCurrency->save();
        }

        $lineItem = new \XeroPHP\Models\Accounting\LineItem();
        $lineItem->setLineAmount($request->amount);
        $lineItem->setQuantity(1);

        $invoice = new \XeroPHP\Models\Accounting\Invoice($xero);
        $invoice->setType('ACCREC');
        $invoice->addLineItem($lineItem);
        $invoice->setContact($xeroContact);
        $invoice->setCurrencyCode($request->currency);
        $invoice->save();

        return response($invoice);
    }

    public function updateInvoice(Request $request)
    {
        $this->validate($request, [
            'invoice_id' => 'required',
            'status' => 'required',
        ]);
        $authUser = Auth::user();
        $tenantId = $request->tenantId ?? $authUser->xero_tenant_id;
        $XeroClient = new XeroClient($request);
        $xero = new \XeroPHP\Application($XeroClient->accessToken, $tenantId);
        $xeroInvoice = $xero->load(\XeroPHP\Models\Accounting\Invoice::class)->where('InvoiceID', $request->invoice_id)->first();

        // $lineItem = new \XeroPHP\Models\Accounting\LineItem();
        // $lineItem->setLineAmount($xeroInvoice['AmountDue']);
        // $lineItem->setQuantity(1);
        // $lineItem->setDescription($request->description);
        // $xeroInvoice->addLineItem($lineItem);
        // $xeroInvoice->save();

        $xeroInvoice->setStatus($request->status);
        $xeroInvoice->save();
        return response($xeroInvoice);
    }
}
