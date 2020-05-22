<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\Models\UserCustomer;

class PageController extends Controller
{
    //

    public function homepage(Request $request)
    {
    	if (Auth::check()) :
    		return redirect('/dashboard/messages');
    	endif;

    	return view('frontend.pages.homepage');
    }

}
