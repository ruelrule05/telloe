<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInquiryRequest extends FormRequest
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
            'widget_id' => 'required|integer',
            'user_id' => 'required|integer',
            'message' => 'required|string',
            'inquiry_type_id' => 'required|integer',
            'interests' => 'required|json',
            'source_url' => 'integer|string',
            'metadata' => 'nullable|json',
        ];
    }
}
