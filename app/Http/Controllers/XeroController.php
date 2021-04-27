<?php

namespace App\Http\Controllers;

use App\Http\Requests\XeroSaveTenantRequest;
use App\Http\Requests\XeroStoreInvoiceRequest;
use App\Http\Requests\XeroUpdateInvoiceRequest;
use App\Services\XeroService;
use Auth;
use Cache;
use Illuminate\Http\Request;

class XeroController extends Controller
{
    //

    public function getToken()
    {
        return response(XeroService::getToken());
    }

    public function authenticate(Request $request)
    {
        return XeroService::authenticate($request);
    }

    public function callback(Request $request)
    {
        return response(XeroService::callback($request));
    }

    public function tenants(Request $request)
    {
        return response(XeroService::tenants($request));
    }

    public function saveTenant(XeroSaveTenantRequest $request)
    {
        return response(XeroService::saveTenant($request));
    }

    public function invoices(Request $request)
    {
        return response(XeroService::invoices($request));
    }

    public function remove()
    {
        return response(XeroService::remove());
    }

    public function storeInvoice(XeroStoreInvoiceRequest $request)
    {
        $authUser = Auth::user();
        Cache::forget("{$authUser->id}_xero_invoices");
        return response(XeroService::storeInvoice($request));
    }

    public function updateInvoice(XeroUpdateInvoiceRequest $request)
    {
        $authUser = Auth::user();
        Cache::forget("{$authUser->id}_xero_invoices");
        return response(XeroService::updateInvoice($request));
    }
}
