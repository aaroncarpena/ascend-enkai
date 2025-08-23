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
            'avatar' => 'sometimes|url',
            'municipio_id' => 'sometimes|exists:municipio,id',
            'deporteFavorito' => 'sometimes|string|max:100',
        ];
    }
}
