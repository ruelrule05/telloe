<?php

namespace App\Services;

use App\Models\UserCustomField;
use Auth;
use Illuminate\Http\Request;

class UserCustomFieldService
{
    public static function index()
    {
        return Auth::user()->customFields ?? ['fields' => []];
    }

    public static function show($id)
    {
        return ;
    }

    public static function store(Request $request)
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

        return $userCustomField;
    }

    public static function update($id, Request $request)
    {
        return ;
    }

    public static function delete($id)
    {
        return ;
    }
}
