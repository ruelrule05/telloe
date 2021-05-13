<?php

namespace App\Http\Requests;

use App\Models\Contact;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePendingSubscriptionRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function authorize()
    {
        $contact = Contact::find($this->user_id);
        return $this->user()->can('create_subscription', $contact);
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
            'services' => 'required|array',
            'date' => 'required|date',
            'recurring_frequency' => 'required| ', Rule::in(['week', 'month', 'year']),
            'duration' => 'required|numeric',
            'duration_frequency' => 'required| ', Rule::in(['month', 'year']),
        ];
    }
}
