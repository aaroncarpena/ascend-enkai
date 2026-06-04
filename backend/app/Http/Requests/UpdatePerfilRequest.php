<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePerfilRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'avatar' => 'sometimes|nullable|url|max:255',
            'municipio_id' => 'sometimes|nullable|exists:municipio,id',
            'deporteFavorito' => 'sometimes|nullable|exists:deporte,nombre',
        ];
    }
}
