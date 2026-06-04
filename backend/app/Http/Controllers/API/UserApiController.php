<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Municipio;
use App\Models\Perfil;
use App\Models\User;
use App\Models\Deporte;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class UserApiController extends Controller
{
    public function index()
    {
        return User::query()
            ->select('id', 'name', 'email', 'telefono', 'rol', 'created_at')
            ->orderBy('name')
            ->get();
    }

    public function show($id)
    {
        return User::findOrFail($id);
    }

    public function profile(Request $request)
    {
        return $request->user()->load([
            'perfil.municipio.provincia.pais',
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('users', 'name')->ignore($user->id)],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'telefono' => ['nullable', 'string', 'max:20'],
            'avatar' => ['nullable', 'url', 'max:255'],
            'municipio_id' => ['nullable', 'exists:municipio,id'],
            'deporteFavorito' => ['nullable', 'string', 'max:100'],
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'telefono' => $validated['telefono'] ?? null,
        ]);

        $municipio = null;
        if (! empty($validated['municipio_id'])) {
            $municipio = Municipio::with('provincia.pais')->find($validated['municipio_id']);
        }

        Perfil::updateOrCreate(
            ['user_id' => $user->id],
            [
                'avatar' => ($validated['avatar'] ?? null) ?: $this->defaultAvatar($user->name),
                'municipio_id' => $municipio?->id,
                'provincia_id' => $municipio?->provincia_id,
                'pais_id' => $municipio?->provincia?->pais_id,
                'deporteFavorito' => $validated['deporteFavorito'] ?? null,
            ],
        );

        return $user->load([
            'perfil.municipio.provincia.pais',
        ]);
    }

    public function uploadAvatar(Request $request)
    {
        $validated = $request->validate([
            'avatar' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
        ]);

        $user = $request->user();
        $perfil = $user->perfil()->firstOrCreate([], [
            'avatar' => $this->defaultAvatar($user->name),
        ]);

        $this->deleteLocalAvatar($perfil->avatar);

        $path = $validated['avatar']->store('avatars', 'public');

        $perfil->update([
            'avatar' => Storage::disk('public')->url($path),
        ]);

        return $user->load([
            'perfil.municipio.provincia.pais',
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return $user;
    }

    public function destroy(Request $request, User $user)
    {
        if ($request->user()->is($user)) {
            return response()->json([
                'message' => 'No puedes eliminar tu propia cuenta de administrador.',
            ], 422);
        }

        DB::transaction(function () use ($user) {
            DB::table('user_amigos')
                ->where('solicitante_id', $user->id)
                ->orWhere('receptor_id', $user->id)
                ->delete();

            $user->delete();
        });

        return response()->json(['message' => 'Usuario eliminado.']);
    }

    public function addDeporte($userId, $deporteId)
    {
        $user = User::findOrFail($userId);
        $user->deportes()->attach($deporteId);
        return response()->json(['message' => 'Deporte añadido al usuario']);
    }

    public function removeDeporte($userId, $deporteId)
    {
        $user = User::findOrFail($userId);
        $user->deportes()->detach($deporteId);
        return response()->json(['message' => 'Deporte eliminado del usuario']);
    }

    private function defaultAvatar(string $name): string
    {
        return 'https://ui-avatars.com/api/?background=AAED43&color=1a2e00&name=' . urlencode($name);
    }

    private function deleteLocalAvatar(?string $avatar): void
    {
        if (! $avatar) {
            return;
        }

        $path = parse_url($avatar, PHP_URL_PATH);

        if (! $path || ! str_starts_with($path, '/storage/avatars/')) {
            return;
        }

        Storage::disk('public')->delete(str_replace('/storage/', '', $path));
    }
}
