<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\PendingSubscription;
use App\Models\Contact;
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
            'date' => 'required|date',
            'recurring_frequency' => 'required|in:week,month,year',
            'duration' => 'required|numeric',
            'duration_frequency' => 'required|in:month,year',
        ]);

        $contact = Contact::findOrFail($request->contact_id);
        $this->authorize('create_subscription', $contact);

    	$data = $request->all();
    	$data['user_id'] = Auth::user()->id;
        $total = 0;
        foreach($request->services as $service) :
            if($service['rate'] && $service['frequency'] && $service['frequency_interval']) :
                $total += ($service['frequency'] * $service['rate']);
            endif;
        endforeach;
        $data['amount'] = $total * 100;
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
