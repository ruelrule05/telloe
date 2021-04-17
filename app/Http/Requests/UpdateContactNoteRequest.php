<?php

namespace App\Http\Requests;

use App\Models\ContactNote;
use Illuminate\Foundation\Http\FormRequest;

class UpdateContactNoteRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function authorize()
    {
        $note = ContactNote::findOrfail($this->contact_note);
        return $this->user()->can('show', $note->contact);
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function rules()
    {
        return [
            'note' => 'nullable|string|max:255',
        ];
    }
}
