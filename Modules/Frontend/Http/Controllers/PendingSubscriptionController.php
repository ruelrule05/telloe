<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PendingSubscription;
use Auth;

class PendingSubscriptionController extends Controller
{
    public function index()
    {
       $pendingSubscriptions = PendingSubscription::with('contact.contactUser')->where('user_id', Auth::user()->id)->orderBy('created_at', 'DESC')->get();
       return response()->json($pendingSubscriptions);
    }

    public function store(Request $request) 
    {
    	$this->validate($request, [
    		'contact_id' => 'required|exists:contacts,id',
    		'services' => 'required|array',
    		'amount' => 'required|numeric'
    	]);
    	$data = $request->all();
    	$data['user_id'] = Auth::user()->id;
    	$data['amount'] = $data['amount'] * 100;
    	$pendingSubscription = PendingSubscription::create($data);

    	return response()->json($pendingSubscription->load('contact.contactUser'));
    }


    public function destroy(PendingSubscription $pendingSubscription)
    {
    	$this->authorize('delete', $pendingSubscription);
    	$pendingSubscription->delete();

    	return response()->json(['deleted' => true]);
    }
}
