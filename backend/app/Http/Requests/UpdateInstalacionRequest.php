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
            'nombre' => 'sometimes|string|max:150',
            'direccion' => 'sometimes|string|max:255',
            'municipio_id' => 'sometimes|exists:municipio,id',
        ];
    }
}

