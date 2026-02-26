<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Reserva;
use Illuminate\Http\Request;

class ReservaApiController extends Controller
{
    public function index(){
        return Reserva::all();
    }
    public function store(Request $request){
        return Reserva::create($request->all());
    }
    public function show($id){
        return Reserva::findOrFail($id);
    }
    public function update(Request $request, $id){
        $reserva = Reserva::findOrFail($id);

        $reserva->update($request->all());
        return $reserva;
    }
    public function destroy($id){
        Reserva::findOrFail($id);
        return response()->json(['message' => 'Reserva Borrada']);
    }
}
