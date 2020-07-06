<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserCustomer;
use Auth;

class PageController extends Controller
{
    //

    public function homepage(Request $request)
    {
    	if (Auth::check()) :
    		return redirect('/dashboard/conversations');
    	endif;

    	return view('frontend::pages.homepage', ['userCustomer' => $this->getUserCustomer($request)]);
    }

    public function privacyPolicy(Request $request)
    {
        return view('frontend::pages.privacy-policy', ['userCustomer' => $this->getUserCustomer($request)]);
    }

    public function termsOfService(Request $request)
    {
        return view('frontend::pages.terms-of-service', ['userCustomer' => $this->getUserCustomer($request)]);
    }

    public function getUserCustomer(Request $request)
    {
        $userCustomer = null;
        if($request->invite_token) :
            $userCustomer = UserCustomer::where('invite_token', $request->invite_token)->where('is_pending', true)->first();
        endif;

        return $userCustomer;
    }
}
