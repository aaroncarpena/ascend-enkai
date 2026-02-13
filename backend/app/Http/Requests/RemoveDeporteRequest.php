<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RemoveDeporteRequest extends FormRequest
{

    public function authorize()
    {

        return true;
    }


    public function rules()
    {
        return [
            'user' => 'required|exists:users,id',
            'deporte' => 'required|exists:deportes,id',
        ];
    }


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
