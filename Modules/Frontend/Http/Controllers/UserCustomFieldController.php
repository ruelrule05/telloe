<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\UserCustomField;
use Auth;
use Illuminate\Http\Request;

class UserCustomFieldController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(Auth::user()->customFields ?? ['fields' => []]);
    }

    public function store(Request $request)
    {
        $userCustomField = UserCustomField::firstOrNew(['user_id' => Auth::user()->id]);
        $fields = [];
        foreach ($request->fields as $field) {
            if (! in_array($field, $fields)) {
                $fields[] = $field;
            }
        }
        $userCustomField->fields = $fields;
        $userCustomField->save();

        return response()->json($userCustomField);
    }
}
