<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginUserApiRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthApiController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'telefono' => 'required|string|max:20',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'telefono' => $validated['telefono'],
        ]);

        $user->perfil()->create([
            'avatar' => $this->defaultAvatar($user->name),
        ]);

        return response()->json([
            'access_token' => $user->createToken('auth_token')->plainTextToken,
            'token_type' => 'Bearer',
            'user' => $user->load('perfil'),
        ], 201);
    }

    public function login(LoginUserApiRequest $request)
    {
        $credentials = $request->validated();
        $field = filter_var($credentials['login'], FILTER_VALIDATE_EMAIL) ? 'email' : 'name';
        $user = User::where($field, $credentials['login'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'login' => ['Credenciales incorrectas.'],
            ]);
        }

        return response()->json([
            'access_token' => $user->createToken('auth_token')->plainTextToken,
            'token_type' => 'Bearer',
            'user' => $user->load('perfil'),
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()?->delete();

        return response()->json([
            'message' => 'Sesión cerrada correctamente.',
        ]);
    }

    private function defaultAvatar(string $name): string
    {
        return 'https://ui-avatars.com/api/?background=AAED43&color=1a2e00&name=' . urlencode($name);
    }
}
