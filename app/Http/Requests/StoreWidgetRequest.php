<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWidgetRequest extends FormRequest
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
            'user_id' => 'required|integer',
            'name' => 'required|string|max:100',
            'heading' => 'required|string|max:1255',
            'welcome_message' => 'required|string',
            'domain' => 'required|string|max:100',
            'slug' => 'required|string|max:100',
            'fb_page' => 'json',
            'widget_type_id' => 'required|integer',
            'colors' => 'json',
            'notify_messenger' => 'integer',
            'notify_sms' => 'integer',
            'default_chatbot' => 'integer',
            'business_hours' => 'json',
            'button_text' => 'required|string|max:50',
        ];
    }
}
