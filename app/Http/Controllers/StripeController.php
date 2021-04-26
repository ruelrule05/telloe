<?php

namespace App\Http\Controllers;

use App\Http\StripeAPI;
use Auth;
use Cache;
use Illuminate\Http\Request;

class StripeController extends Controller
{
    //
    public function invoices()
    {
        $authUser = Auth::user();
        if (! $authUser->stripe_account) {
            return abort(403, 'Payout account not complete');
        }

        $invoices = Cache::remember("{$authUser->id}_stripe_invoices", 43200, function () use ($authUser) {
            $stripe = new StripeAPI();
            return $stripe->invoice('all', null, ['stripe_account' => Auth::user()->stripe_account['id']]);
        });
        return response()->json($invoices);
    }

    public function update($id, Request $request)
    {
        $this->validate($request, [
            'action' => 'required'
        ]);
        $stripe = new StripeAPI();
        $invoice = $stripe->invoice('retrieve', $id, ['stripe_account' => Auth::user()->stripe_account['id']]);
        switch ($request->action) {
            case 'send':
                $invoice = $invoice->sendInvoice();
                break;
            case 'void':
                $invoice = $invoice->voidInvoice();
                break;
            case 'uncollectible':
                $invoice = $invoice->markUncollectible();
                break;
            case 'pay':
                $invoice = $invoice->pay();
                break;
        }
        $authUser = Auth::user();
        Cache::forget("{$authUser->id}_stripe_invoices");
        return $invoice;
    }
}
