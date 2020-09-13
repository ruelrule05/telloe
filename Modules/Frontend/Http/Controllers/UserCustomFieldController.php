<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\UserCustomField;
use Illuminate\Http\Request;
use Auth;

class UserCustomFieldController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(Auth::user()->customFields ?? ['fields' => []]);
    }

    public function store(Request $request)
    {
        $userCustomField = UserCustomField::firstOrNew(['user_id' => Auth::user()->id]);
        $userCustomField->fields = $request->fields ;
        $userCustomField->save();

        return response()->json($userCustomField);
    }
}
