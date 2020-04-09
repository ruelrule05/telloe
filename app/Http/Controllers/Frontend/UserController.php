<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    //

    public function search(Request $request)
    {
        $users = [];
        if($request->search ):
            $users = User::where('email', 'LIKE', '%' . $request->search . '%')->get();
        endif;

        return response()->json($users);
    }


}
