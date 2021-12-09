<?php

namespace App\Http\Requests;

use App\Models\Booking;
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
        $booking = Booking::findOrFail($this->route('booking'));
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

            'date' => 'required|date',
            'start' => 'required|date_format:H:i',
            'end' => 'required|date_format:H:i',
            'notes' => 'nullable|string',
            'timezone' => 'required|string',
            'service_id' => 'required|exists:services,id',

            // 'end' => 'required|string|max:20',
            // 'metadata' => 'nullable|json',
            // 'notified_2' => 'required|integer',
            // 'notified_24' => 'required|integer',
            // 'zoom_link' => 'nullable',
            // 'meet_link' => 'nullable',
        ];
    }
}
