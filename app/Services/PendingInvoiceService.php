<?php

namespace App\Services;

use App\Http\Requests\StorePendingInvoiceRequest;
use App\Models\PendingInvoice;
use Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class PendingInvoiceService
{
    use AuthorizesRequests;

    public static function index()
    {
        $pendingInvoices = PendingInvoice::with('contact.contactUser')->where('user_id', Auth::user()->id)->orderBy('created_at', 'DESC')->get();
        return $pendingInvoices;
    }

    public static function show($id)
    {
        return ;
    }

    public static function store(StorePendingInvoiceRequest $request)
    {
        $data = $request->all();
        $data['user_id'] = Auth::user()->id;
        $data['amount'] = $data['amount'] * 100;
        $pendingInvoice = PendingInvoice::create($data);

        return response()->json($pendingInvoice->load('contact.contactUser'));
    }

    public static function update($id, Request $request)
    {
        return ;
    }

    public function delete(PendingInvoice $pendingInvoice)
    {
        $this->authorize('delete', $pendingInvoice);
        $pendingInvoice->delete();

        return ['deleted' => true];
    }
}
