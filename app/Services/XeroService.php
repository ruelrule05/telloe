<?php

namespace App\Services;

use App\Http\Requests\XeroSaveTenantRequest;
use App\Http\Requests\XeroStoreInvoiceRequest;
use App\Http\Requests\XeroUpdateInvoiceRequest;
use App\Http\XeroClient;
use App\Models\Contact;
use App\Models\Service;
use Auth;
use Cache;
use Illuminate\Http\Request;

class XeroService
{
    public static function getToken()
    {
        return Auth::user()->xero_token ? 1 : 0;
    }

    public static function authenticate(Request $request)
    {
        $XeroClient = new XeroClient($request);
        session(['oauth2state' => $XeroClient->client->getState()]);
        return response()->json($XeroClient->client);
    }

    public static function callback(Request $request)
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

    public static function saveTenant(XeroSaveTenantRequest $request)
    {
        $authUser = Auth::user();
        $authUser->xero_tenant_id = $request->tenant_id;
        $authUser->save();

        return $authUser->xero_tenant_id;
    }

    public static function tenants(Request $request)
    {
        $authUser = Auth::user();
        $tenants = Cache::remember("{$authUser->id}_xero_tenants", 43200, function () use ($request) {
            $XeroClient = new XeroClient($request);
            return $XeroClient->getTenants();
        });

        return $tenants;
    }

    public static function invoices(Request $request)
    {
        $authUser = Auth::user();
        $invoices = [];

        $tenantId = $request->tenantId ?? $authUser->xero_tenant_id;
        if ($tenantId) {
            $invoices = Cache::remember("{$authUser->id}_xero_invoices", 43200, function () use ($request, $tenantId) {
                $XeroClient = new XeroClient($request);
                $xero = new \XeroPHP\Application($XeroClient->accessToken, $tenantId);
                $invoices = $xero->load(\XeroPHP\Models\Accounting\Invoice::class)
                        ->orderBy('Date', 'DESC')
                        ->where('Status', 'DRAFT')
                        ->orWhere('Status', 'SUBMITTED')
                        ->orWhere('Status', 'AUTHORISED')
                        ->execute();
                return json_encode($invoices);
            });
        }

        return json_decode($invoices, true);
    }

    public static function remove()
    {
        $authUser = Auth::user();
        $authUser->xero_token = null;
        $authUser->xero_tenant_id = null;
        $authUser->save();
        return ['removed' => true];
    }

    public static function storeInvoice(XeroStoreInvoiceRequest $request)
    {
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

        $lineDescription = '';
        if ($request->service_ids) {
            $services = Service::select('name')->whereIn('id', $request->service_ids)->where('user_id', $authUser->id)->get()->toArray();
            $lineDescription = implode(', ', $services);
        }
        $lineItem = new \XeroPHP\Models\Accounting\LineItem();
        $lineItem->setLineAmount($request->amount);
        $lineItem->setQuantity(1);
        $lineItem->setDescription($lineDescription);

        $invoice = new \XeroPHP\Models\Accounting\Invoice($xero);
        $invoice->setType('ACCREC');
        $invoice->addLineItem($lineItem);
        $invoice->setContact($xeroContact);
        $invoice->setCurrencyCode($request->currency);
        $invoice->save();

        return $invoice;
    }

    public static function updateInvoice(XeroUpdateInvoiceRequest $request)
    {
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
        return $xeroInvoice;
    }

    public static function index()
    {
        return ;
    }

    public static function show($id)
    {
        return ;
    }

    public static function store(Request $request)
    {
        return ;
    }

    public static function update($id, Request $request)
    {
        return ;
    }

    public static function delete($id)
    {
        return ;
    }
}
