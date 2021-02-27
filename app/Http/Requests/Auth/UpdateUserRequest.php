<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            'username' => 'required|max:255',
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'email' => 'required|string|max:100|',

            'phone' => 'nullable|numeric|max:30',
            'availability' => 'nullable|array',
            // 'role_id' => 'required|integer',
            // 'profile_image' => 'required|string|max:255',
            // 'stripe_account' => 'json',
            // 'stripe_customer_id' => 'string|max:191',
            // 'psid' => 'string|max:191',

            // 'dial_code' => 'string|max:5',
            // 'facebook_id' => 'string|max:191',
            // 'google_id' => 'string|max:191',

            // 'timezone' => 'string|max:191',
            // 'notify_message' => 'integer|max:1',
            // 'notify_sms' => 'integer|max:1',
            // 'notify_email' => 'integer|max:1',
        ];
    }
}
