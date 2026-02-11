<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RemoveDeporteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'user' => 'required|exists:users,id',
            'deporte' => 'required|exists:deportes,id',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'user.required' => 'El ID del usuario es obligatorio.',
            'user.exists' => 'El usuario especificado no existe.',
            'deporte.required' => 'El ID del deporte es obligatorio.',
            'deporte.exists' => 'El deporte especificado no existe.',
        ];
    }
}
