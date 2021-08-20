<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreServiceRequest extends FormRequest
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
            'name' => 'nullable|string|max:191',
            'description' => 'nullable|string',
            'duration' => 'required|integer|min:5',
            'days' => 'required',
            'default_rate' => 'numeric|numeric',
            'timezone' => 'required|string',
            'form_builder' => 'nullable|json'
        ];
    }
}
