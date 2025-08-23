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
            'avatar' => 'nullable|url',
            'municipio_id' => 'required|exists:municipio,id',
            'deporteFavorito' => 'nullable|string|max:100',
            'user_id' => 'required|exists:users,id',
        ];
    }
}

