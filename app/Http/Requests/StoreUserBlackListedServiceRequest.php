<?php

namespace App\Http\Requests;

use App\Models\Service;
use Illuminate\Foundation\Http\FormRequest;

class StoreUserBlackListedServiceRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function authorize()
    {
        $service = Service::find($this->user_id);
        return $this->user()->can('blacklist', $service);
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function rules()
    {
        return [
            'is_blacklisted' => 'required|boolean',
            'user_id' => 'required|exists:users,id',
            'service_id' => 'required|exists:services,id',
        ];
    }
}
