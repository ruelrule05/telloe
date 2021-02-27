<?php

namespace App\Http\Requests;

use App\Models\Contact;
use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function authorize()
    {
        $contact = Contact::find($this->user_id);
        return $this->user()->can('show', $contact);

        $service = Service::find($this->user_id);
        return $this->user()->can('addBooking', $service);
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function rules()
    {
        return [
            'service_id' => 'required|exists:services,id',
            'user_id' => 'nullable|exists:users,id',
            'contact_id' => 'nullable|exists:contacts,id',
            'date' => 'required|date',
            'start' => 'required|string|max:20',

            // 'end' => 'required|string|max:20',
            // 'metadata' => 'nullable|json',
            // 'notified_2' => 'required|integer',
            // 'notified_24' => 'required|integer',
            // 'zoom_link' => 'nullable',
            // 'meet_link' => 'nullable',
        ];
    }
}
