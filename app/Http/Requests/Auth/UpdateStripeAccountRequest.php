<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStripeAccountRequest extends FormRequest
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
            'country' => 'required',
            'address' => 'required',
            'city' => 'required',
            'state' => 'required',
            'postal' => 'required',
            'website' => 'required|url',
            'phone' => 'required',
            'dob' => 'required|date',
            'account_number' => 'required',
            'account_holder_name' => 'required',
        ];
    }
}
