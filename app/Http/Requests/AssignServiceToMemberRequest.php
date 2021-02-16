<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AssignServiceToMemberRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function rules()
    {
        return [
            'service_id' => 'required|exists:services,id',
        ];
    }
}
