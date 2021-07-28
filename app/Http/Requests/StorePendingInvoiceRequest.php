<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePendingInvoiceRequest extends FormRequest
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
            'contact_id' => 'required|exists:contacts,id',
            'service_ids' => 'nullable|array',
            'amount' => 'required|numeric',
            // 'currency' => 'required|min:3|max:3',
        ];
    }
}
