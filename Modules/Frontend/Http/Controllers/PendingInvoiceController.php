<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PendingInvoice;
use Auth;

class PendingInvoiceController extends Controller
{
    public function index()
    {
       $pendingInvoices = PendingInvoice::with('contact.contactUser')->where('user_id', Auth::user()->id)->orderBy('created_at', 'DESC')->get();
       return response()->json($pendingInvoices);
    }

    public function store(Request $request) 
    {
    	$this->validate($request, [
    		'contact_id' => 'required|exists:contacts,id',
    		'service_ids' => 'required|array',
    		'amount' => 'required|numeric'
    	]);
    	$data = $request->all();
    	$data['user_id'] = Auth::user()->id;
    	$data['amount'] = $data['amount'] * 100;
    	$pendingInvoice = PendingInvoice::create($data);

    	return response()->json($pendingInvoice->load('contact.contactUser'));
    }


    public function destroy(PendingInvoice $pendingInvoice)
    {
    	$this->authorize('delete', $pendingInvoice);
    	$pendingInvoice->delete();

    	return response()->json(['deleted' => true]);
    }
}
