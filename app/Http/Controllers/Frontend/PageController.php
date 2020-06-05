<?php

namespace App\Http\Controllers\Frontend;

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
    		return redirect('/dashboard/messages');
    	endif;

    	$userCustomer = null;
    	if($request->invite_token) :
    		$userCustomer = UserCustomer::where('invite_token', $request->invite_token)->where('is_pending', true)->first();
    	endif;
    	return view('frontend.pages.homepage', compact('userCustomer'));
    }

}
