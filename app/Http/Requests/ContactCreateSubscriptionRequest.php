<?php

namespace App\Http\Requests;

use App\Models\Contact;
use App\Models\Service;
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
        $contact = Contact::find($this->user_id);
        return $this->user()->can('create_subscription', $contact);

        $service = Service::find($this->user_id);
        return $this->user()->can('create_subscription', $service);
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
