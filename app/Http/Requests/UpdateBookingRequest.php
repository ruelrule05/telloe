<?php

namespace App\Http\Requests;

use App\Models\Booking;
use App\Models\Service;
use Illuminate\Foundation\Http\FormRequest;

class UpdateBookingRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function authorize()
    {
        $service = Service::find($this->user_id);
        return $this->user()->can('show', $service);

        $booking = Booking::find($this->user_id);
        return $this->user()->can('update', $booking);
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function rules()
    {
        return [
            // 'user_id' => 'required|integer',
            // 'contact_id' => 'required|integer',

            'service_id' => 'required|integer|exists:services,id',
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
