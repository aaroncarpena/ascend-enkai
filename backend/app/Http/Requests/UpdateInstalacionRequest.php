<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInstalacionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => 'required|string|max:150',
            'direccion' => 'required|string|max:255',
            'municipio_id' => 'required|exists:municipio,id',
            'horario_apertura' => 'required|date_format:H:i',
            'horario_clausura' => 'required|date_format:H:i|different:horario_apertura',
        ];
    }
}

