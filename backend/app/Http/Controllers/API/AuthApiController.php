<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginUserApiRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Validation\ValidationException;

class AuthApiController extends Controller
{
    public function register(Request $request)
    {
        try {
            // Debug: Log de datos recibidos
            \Log::info('=== INICIO REGISTRO ===');
            \Log::info('Datos recibidos:', $request->all());

            // Validar los datos de entrada
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|unique:users',
                'password' => 'required|string|min:6|confirmed',
                'telefono' => 'required|string|max:20',
            ]);

            \Log::info('Validación exitosa');

            // Crear el usuario
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'telefono' => $validated['telefono'],
            ]);

            \Log::info('Usuario creado con ID:', ['user_id' => $user->id]);

            // Debug: Verificar que HasApiTokens esté funcionando
            if (!method_exists($user, 'createToken')) {
                \Log::error('El modelo User NO tiene el método createToken');
                return response()->json([
                    'message' => 'Error: HasApiTokens no está configurado correctamente',
                ], 500);
            }

            \Log::info('Método createToken disponible');

            // Debug: Verificar tabla personal_access_tokens
            if (!\Schema::hasTable('personal_access_tokens')) {
                \Log::error('La tabla personal_access_tokens NO existe');
                return response()->json([
                    'message' => 'Error: Tabla personal_access_tokens no existe',
                ], 500);
            }

            \Log::info('Tabla personal_access_tokens existe');

            // Generar el token de Sanctum
            $tokenResult = $user->createToken('auth_token');
            $token = $tokenResult->plainTextToken;

            \Log::info('Token generado:', [
                'token_id' => $tokenResult->accessToken->id ?? 'N/A',
                'token_preview' => substr($token, 0, 20) . '...',
                'token_length' => strlen($token)
            ]);

            // Debug: Verificar que el token se guardó en BD
            $tokenCount = $user->tokens()->count();
            \Log::info('Tokens del usuario en BD:', ['count' => $tokenCount]);

            // Devolver respuesta exitosa
            $response = [
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
                'debug' => [
                    'user_id' => $user->id,
                    'token_length' => strlen($token),
                    'tokens_count' => $tokenCount
                ]
            ];

            \Log::info('=== REGISTRO EXITOSO ===', [
                'user_id' => $user->id,
                'token_length' => strlen($token)
            ]);

            return response()->json($response, 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Error de validación:', $e->errors());
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Illuminate\Database\QueryException $e) {
            \Log::error('Error de base de datos:', [
                'message' => $e->getMessage(),
                'sql' => $e->getSql() ?? 'N/A'
            ]);
            return response()->json([
                'message' => 'Database error',
                'error' => $e->getMessage(),
            ], 500);
        } catch (\Exception $e) {
            \Log::error('Error inesperado:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ]);
            return response()->json([
                'message' => 'An unexpected error occurred',
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ], 500);
        }
    }

    public function login(LoginUserApiRequest $request)
    {
        $credentials = $request->validated();

        // Verificar si el valor introducido es email o username
        $field = filter_var($credentials['login'], FILTER_VALIDATE_EMAIL) ? 'email' : 'name';

        $user = User::where($field, $credentials['login'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'login' => ['Credenciales incorrectas'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        try {
            $user = $request->user();
            if (!$user) {
                return response()->json([
                    'message' => 'Usuario no autenticado',
                ], 401);
            }

            $token = $user->currentAccessToken();
            if (!$token) {
                return response()->json([
                    'message' => 'Token no encontrado',
                ], 401);
            }

            $token->delete();

            return response()->json([
                'message' => 'Sesión cerrada correctamente',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al cerrar sesión',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
