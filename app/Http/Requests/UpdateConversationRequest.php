<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateConversationRequest extends FormRequest
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
            'user_id' => 'integer',
            'contact_id' => 'integer',
            'name' => 'nullable|string|max:191',
            'metadata' => 'nullable|json',
            'source' => 'nullable|string|max:191',
            'tags' => 'nullable|json',
            'custom_fields' => 'nullable|json',
            'archive_users' => 'nullable|json',
        ];
    }
}
