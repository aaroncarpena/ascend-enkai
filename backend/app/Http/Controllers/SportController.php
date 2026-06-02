<?php

namespace App\Http\Controllers;

use App\Models\Deporte;
use Illuminate\Http\JsonResponse;

class SportController extends Controller
{
    public function index(): JsonResponse
    {
        $deportes = Deporte::with('modalidades')->get();

        return response()->json($deportes, 200);
    }

    public function show(int $id): JsonResponse
    {
        $deporte = Deporte::with(['modalidades', 'partidos'])->findOrFail($id);

        return response()->json($deporte, 200);
    }
}
