<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Instalacion;
use Illuminate\Http\Request;

class InstalacionApiController extends Controller
{
    public function index(){
        return Instalacion::with('municipio.provincia')->paginate(10);
    }
    public function store(Request $request)
    {
        return Instalacion::create($request->all());
    }
    public function show($id){
        return Instalacion::with('municipio.provincia')->findOrFail($id);
    }
    public function update(Request $request, $id){
        $instalacion = Instalacion::findOrFail($id);
        $instalacion->update($request->all());
        return $instalacion;
    }
    public function destroy($id){
        Instalacion::findOrFail($id);
        return response()->json(['message' => 'Instalación eliminada.']);
    }

}
