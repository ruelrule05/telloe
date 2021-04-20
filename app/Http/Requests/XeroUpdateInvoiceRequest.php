<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class XeroUpdateInvoiceRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function authorize()
    {
        return $this->user()->xero_tenant_id == $this->tenantId;
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function rules()
    {
        return [
            'invoice_id' => 'required',
            'status' => 'required',
            'tenantId' => 'required',
        ];
    }
}
