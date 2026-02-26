<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Deporte;
use Illuminate\Http\Request;

class DeporteApiController extends Controller
{
    public function index()
    {
        return Deporte::all();
    }

    public function show($id)
    {
        return Deporte::findOrFail($id);
    }

    public function store(Request $request)
    {
        $deporte = Deporte::create($request->all());
        return $deporte;
    }

    public function update(Request $request, $id)
    {
        $deporte = Deporte::findOrFail($id);
        $deporte->update($request->all());
        return $deporte;
    }

    public function destroy($id)
    {
        Deporte::findOrFail($id)->delete();
        return response()->json(['message' => 'Deporte eliminado']);
    }
}
