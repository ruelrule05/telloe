<?php

namespace App\Http\Requests;

use App\Models\Service;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class UpdateServiceRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function authorize()
    {
        $service = Service::find($this->id);
        return $this->user()->can('update', $service);
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function rules()
    {
        return [
            'name' => 'nullable|string|max:191',
            'description' => 'nullable|string',
            'duration' => 'required|integer|min:5|max:360',
            'days' => 'required',
            'default_rate' => 'numeric',
            'form_builder' => 'nullable|json'
        ];
    }
}
