<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePendingInvoiceRequest;
use App\Models\PendingInvoice;
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
        $pendingInvoiceService = new NotificationService();
        return response($pendingInvoiceService->destroy($pendingInvoice));
    }
}
