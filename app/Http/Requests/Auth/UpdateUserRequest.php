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
            'username' => 'required|alpha_num|max:255',
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'email' => 'required|string|max:100|',

            'phone' => 'nullable|numeric',
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
            'notify_message' => 'boolean',
            'notify_sms' => 'boolean',
            'notify_email' => 'boolean',
            'packages' => 'boolean',
            'team' => 'boolean',
            'payments' => 'boolean',
            'blocked_timeslots' => 'nullable|array'
        ];
    }
}
