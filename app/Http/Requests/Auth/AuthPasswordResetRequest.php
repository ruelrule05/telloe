<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthPasswordResetRequest extends FormRequest
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
            'password' => 'required|string|confirmed|max:255',
        ];
    }
}
