<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMunicipioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => 'sometimes|string|max:150',
            'codigoPostal' => 'sometimes|string|max:10',
            'provincia_id' => 'sometimes|exists:provincia,id',
        ];
    }
}
