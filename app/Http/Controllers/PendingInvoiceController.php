<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PendingInvoice;
use App\Http\Requests\StorePendingInvoiceRequest;
use App\Services\PendingInvoiceService;

class PendingInvoiceController extends Controller
{
    public function index()
    {
        return response(PendingInvoiceService::index());
    }

    public function store(StorePendingInvoiceRequest $request)
    {
        return response(PendingInvoiceService::store($request));
    }

    public function destroy(PendingInvoice $pendingInvoice)
    {
        $this->authorize('delete', $pendingInvoice);
        $pendingInvoice->delete();

        return response()->json(['deleted' => true]);
    }
}
