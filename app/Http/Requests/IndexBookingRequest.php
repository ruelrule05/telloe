<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IndexBookingRequest extends FormRequest
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
            'conversation_id' => 'nullable|exists:conversations,id'

            // 'user_id' => 'required|integer',
            // 'uuid' => 'required|unique',
            // 'emails' => 'required|email|exists:members,email',
        ];
    }
}
