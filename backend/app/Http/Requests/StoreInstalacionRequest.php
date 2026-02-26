<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInstalacionRequest extends FormRequest
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
            'precio' => 'required|numeric|decimal:2',
            'municipio_id' => 'required|exists:municipio,id',
        ];
    }
}
