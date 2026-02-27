<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegistroRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'name' => 'required|string|',
            'email' => 'required|string',
            'password' => 'required|string|min:6',
            'telefono' => 'string|min:9'
        ];
    }
}
