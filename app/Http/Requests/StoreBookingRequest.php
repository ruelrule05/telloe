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
        $validContacts = true;
        foreach ($this->contact_ids as $contactID) {
            $contact = Contact::findOrFail($contactID);
            if (! $this->user()->can('show', $contact)) {
                $validContacts = false;
                break;
            }
        }
        $service = Service::find($this->service_id);
        $canAddBookingToService = true;
        if ($service) {
            $canAddBookingToService = $this->user()->can('addBooking', $service) ;
        }

        return $validContacts && $canAddBookingToService;
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'service_id' => 'nullable|exists:services,id',
            'contact_ids' => 'nullable|array',
            'emails' => 'nullable|array',
            'date' => 'required|date',
            'start' => 'required|date_format:H:i',
            'end' => 'required|date_format:H:i',
            'notes' => 'nullable|string',
            'contact_package_id' => 'nullable|exists:contact_packages,id',
            'meeting_type' => 'required',
            'timezone' => 'required|string',

            // 'end' => 'required|string|max:20',
            // 'metadata' => 'nullable|json',
            // 'notified_2' => 'required|integer',
            // 'notified_24' => 'required|integer',
            // 'zoom_link' => 'nullable',
            // 'meet_link' => 'nullable',
        ];
    }
}
