<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePerfilRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'avatar' => 'nullable|url|max:255',
            'municipio_id' => 'nullable|exists:municipio,id',
            'deporteFavorito' => 'nullable|exists:deporte,nombre',
            'user_id' => 'required|exists:users,id',
        ];
    }
}

