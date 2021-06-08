<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class StoreBookingLinkRequest extends FormRequest
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
            'name' => 'required|max:255',
            'contacts' => 'required|array',
            'dates' => 'required|array',
            'duration' => 'required|integer|min:5|max:360',

            // 'user_id' => 'required|integer',
            // 'uuid' => 'required|unique',
            // 'emails' => 'required|email|exists:members,email',
        ];
    }
}
