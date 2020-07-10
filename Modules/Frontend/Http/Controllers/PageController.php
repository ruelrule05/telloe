<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contact;
use App\Models\Plan;
use Auth;

class PageController extends Controller
{
    //

    public function homepage(Request $request)
    {
    	if (Auth::check()) :
    		return redirect('/dashboard/conversations');
    	endif;

        $plans = Plan::orderBy('price', 'ASC')->get();

    	return view('frontend::pages.homepage', ['contact' => $this->getContact($request), 'plans' => $plans]);
    }

    public function privacyPolicy(Request $request)
    {
        return view('frontend::pages.privacy-policy', ['contact' => $this->getContact($request)]);
    }

    public function termsOfService(Request $request)
    {
        return view('frontend::pages.terms-of-service', ['contact' => $this->getContact($request)]);
    }

    public function getContact(Request $request)
    {
        $contact = null;
        if($request->invite_token) :
            $contact = Contact::where('invite_token', $request->invite_token)->where('is_pending', true)->first();
        endif;

        return $contact;
    }
}
