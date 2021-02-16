<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePlanRequest extends FormRequest
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
            'name' => 'string|max:191',
            'subheading' => 'string|max:191',
            'price' => 'numeric|between:0, 99.9',
            'description' => 'string',
            'seats' => 'string|max:100',
            'stripe_plan_id' => 'string|max:100',
            'interval' => 'string|max:100',
            'every_months' => 'integer',
            'per_user' => 'integer|max:1',
        ];
    }
}
