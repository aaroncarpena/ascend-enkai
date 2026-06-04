<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string', 'max:255', Rule::unique('users', 'name')->ignore($this->route('id'))],
            'email' => ['sometimes', 'email', 'max:255', Rule::unique('users', 'email')->ignore($this->route('id'))],
            'password' => 'nullable|string|min:6|max:255|confirmed',
            'telefono' => ['sometimes', 'regex:/^[0-9]{9}$/'],
        ];
    }
}

