<?php

namespace App\Http\Requests;

use App\Models\Conversation;
use Illuminate\Foundation\Http\FormRequest;

class StoreConversationMemberRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function authorize()
    {
        $conversation = Conversation::find($this->user_id);
        return $this->user()->can('addMember', $conversation);
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
            'user_id' => 'required|exists:users,id'
        ];
    }
}
