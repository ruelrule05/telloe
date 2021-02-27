<?php

namespace App\Http\Requests;

use App\Models\Contact;
use App\Models\Service;
use Illuminate\Foundation\Http\FormRequest;

class ContactCreateInvoiceRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function authorize()
    {
        $contact = Contact::find($this->user_id);
        return $this->user()->can('create_invoice', $contact);

        $service = Service::find($this->user_id);
        return $this->user()->can('create_invoice', $service);
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function rules()
    {
        return [
            'service_ids' => 'nullable|array',
            'amount' => 'required|numeric',
        ];
    }
}
