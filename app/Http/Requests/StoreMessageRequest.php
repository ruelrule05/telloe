<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreMessageRequest extends FormRequest
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
            'conversation_id' => 'required|exists:conversations,id',
            'message' => 'required|string',
            'type' => 'required|', Rule::in(['text', 'emoji', 'image', 'audio', 'video', 'file', 'call_failed', 'call_ended']),
        ];
    }
}
