<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateContactRequest extends FormRequest
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
            'user_id' => 'required|integer',
            'contact_user_id' => 'required|integer',
            'email' => 'required|email|unique:users,email|max:191',
            'first_name' => 'required|max:191|string',
            'last_name' => 'required|max:191|string',
            'is_pending' => 'required|integer',
            'invite_token' => 'required|string|max:30',
            'blacklisted_services' => 'nullable|json',
            'invoices' => 'nullable|json',
            'subscription' => 'nullable|json',
            'stripe_customer_id' => 'nullable|max:191|string',
            'xero_guid' => 'nullable|max:191|string',
            'custom_fields' => 'nullable|json',
        ];
    }
}
