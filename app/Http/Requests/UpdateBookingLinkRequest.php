<?php

namespace App\Http\Requests;

use App\Models\BookingLink;
use Illuminate\Foundation\Http\FormRequest;

class UpdateBookingLinkRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function authorize()
    {
        $bookingLink = BookingLink::find($this->route('booking_link'));
        return $this->user()->can('update', $bookingLink);
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function rules()
    {
        return [
            'dates' => 'required|array',

            // 'name' => 'required|max:255',
            // 'user_id' => 'required|integer',
            // 'uuid' => 'required|unique',
            // 'emails' => 'required|email|exists:members,email',
        ];
    }
}
