<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInstalacionRequest;
use App\Http\Requests\UpdateInstalacionRequest;
use App\Models\Instalacion;

class InstalacionApiController extends Controller
{
    public function index()
    {
        return Instalacion::with('municipio.provincia')->paginate(10);
    }

    public function adminIndex()
    {
        return Instalacion::with('municipio.provincia')
            ->orderBy('nombre')
            ->get();
    }

    public function store(StoreInstalacionRequest $request)
    {
        return response()->json(
            Instalacion::create($request->validated())->load('municipio.provincia'),
            201,
        );
    }

    public function show($id)
    {
        return Instalacion::with('municipio.provincia')->findOrFail($id);
    }

    public function update(UpdateInstalacionRequest $request, Instalacion $instalacion)
    {
        $instalacion->update($request->validated());

        return $instalacion->load('municipio.provincia');
    }

    public function destroy(Instalacion $instalacion)
    {
        $instalacion->delete();

        return response()->json(['message' => 'Instalación eliminada.']);
    }
}
