<?php

namespace App\Http\Requests;

use App\Models\Conversation;
use Illuminate\Foundation\Http\FormRequest;

class DashboardSearchTagsRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function authorize()
    {
        $contact = Conversation::find($this->user_id);
        return $this->user()->can('show', $contact);
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
            'query' => 'required|string',
        ];
    }
}
