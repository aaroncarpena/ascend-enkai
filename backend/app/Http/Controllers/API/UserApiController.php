<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Deporte;
use Illuminate\Http\Request;

class UserApiController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function show($id)
    {
        return User::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return $user;
    }

    public function destroy($id)
    {
        User::findOrFail($id)->delete();
        return response()->json(['message' => 'Usuario eliminado']);
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
}
