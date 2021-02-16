<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactCreateSubscriptionRequest extends FormRequest
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
            'services' => 'required|array',
            'date' => 'required|date',
            'recurring_frequency' => 'required|in:week,month,year',
            'duration' => 'required|numeric',
            'duration_frequency' => 'required|in:month,year',
        ];
    }
}
