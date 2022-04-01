<?php

namespace App\Http\Requests;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class StoreContactNoteRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function authorize()
    {
        if (! $this->contact_id) {
            return true;
        }
        $contact = Contact::find($this->contact_id);
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
            'contact_id' => 'nullable|integer|exists:contacts,id',
            'linkedin_user' => 'nullable|string',
            'note' => 'required|string|max:255',
        ];
    }
}
