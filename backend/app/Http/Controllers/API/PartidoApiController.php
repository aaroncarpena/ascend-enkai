<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Deporte;
use App\Models\Instalacion;
use App\Models\Partido;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PartidoApiController extends Controller
{
    public function index(Request $request)
    {
        return $this->filteredMatches(Partido::query(), $request)->get();
    }

    public function bySport(Request $request, Deporte $deporte)
    {
        return $this->filteredMatches($deporte->partidos(), $request)->get();
    }

    public function bySportCenter(Request $request, Instalacion $instalacion)
    {
        return $this->filteredMatches($instalacion->partidos(), $request)->get();
    }

    public function show(Partido $partido)
    {
        return $partido->load($this->relations());
    }

    public function mine(Request $request)
    {
        return $request->user()
            ->partidosEnLosQueParticipa()
            ->with($this->relations())
            ->wherePivot('estado', 'confirmado')
            ->whereNotIn('partidos.estado', ['cancelado', 'jugado'])
            ->orderByRaw('(jugadores_actuales >= max_jugadores) asc')
            ->orderBy('partidos.fecha')
            ->orderBy('partidos.hora_inicio')
            ->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'deporte_id' => 'required|exists:deporte,id',
            'instalacion_id' => 'required|exists:instalacion,id',
            'fecha' => 'required|date|after_or_equal:today',
            'hora_inicio' => 'required|date_format:H:i',
            'hora_fin' => 'required|date_format:H:i|after:hora_inicio',
            'max_jugadores' => 'required|integer|min:2|max:50',
            'descripcion' => 'nullable|string|max:500',
            'nivel' => ['required', Rule::in(['Principiante', 'Intermedio', 'Avanzado'])],
        ]);

        $partido = Partido::create([
            ...$validated,
            'user_id' => $request->user()->id,
            'jugadores_actuales' => 1,
            'estado' => 'pendiente',
            'es_publico' => true,
        ]);

        $partido->jugadores()->attach($request->user()->id, [
            'estado' => 'confirmado',
            'unido_en' => now(),
        ]);

        return response()->json($partido->load($this->relations()), 201);
    }

    public function join(Request $request, Partido $partido)
    {
        if ($partido->estado === 'cancelado' || $partido->estado === 'jugado') {
            return response()->json(['message' => 'Este partido no acepta jugadores.'], 422);
        }

        if ($partido->jugadores_actuales >= $partido->max_jugadores) {
            return response()->json(['message' => 'El partido ya está completo.'], 422);
        }

        $userId = $request->user()->id;
        $alreadyJoined = $partido->jugadores()
            ->where('users.id', $userId)
            ->wherePivot('estado', 'confirmado')
            ->exists();

        if (! $alreadyJoined) {
            $partido->jugadores()->syncWithoutDetaching([
                $userId => [
                    'estado' => 'confirmado',
                    'unido_en' => now(),
                ],
            ]);
        }

        $this->syncPlayersCount($partido);

        return $partido->load($this->relations());
    }

    public function leave(Request $request, Partido $partido)
    {
        $deleted = DB::transaction(function () use ($request, $partido) {
            $partido->jugadores()->updateExistingPivot($request->user()->id, [
                'estado' => 'cancelado',
            ]);

            $activePlayersCount = $partido->jugadores()
                ->wherePivot('estado', 'confirmado')
                ->count();

            if ($activePlayersCount === 0) {
                $partido->delete();
                return true;
            }

            $partido->jugadores_actuales = $activePlayersCount;
            $partido->save();

            return false;
        });

        if ($deleted) {
            return response()->json(['message' => 'Partido eliminado porque no quedan jugadores.']);
        }

        return $partido->fresh()->load($this->relations());
    }

    private function filteredMatches($query, Request $request)
    {
        return $query
            ->with($this->relations())
            ->where('partidos.es_publico', true)
            ->whereNotIn('partidos.estado', ['cancelado', 'jugado'])
            ->when($request->filled('nivel'), fn ($query) => $query->where('partidos.nivel', $request->nivel))
            ->when($request->filled('fecha'), fn ($query) => $query->whereDate('partidos.fecha', $request->fecha))
            ->when($request->filled('deporte_id'), fn ($query) => $query->where('partidos.deporte_id', $request->deporte_id))
            ->when($request->filled('instalacion_id'), fn ($query) => $query->where('partidos.instalacion_id', $request->instalacion_id))
            ->orderByRaw('(jugadores_actuales >= max_jugadores) asc')
            ->orderBy('partidos.fecha')
            ->orderBy('partidos.hora_inicio');
    }

    private function relations(): array
    {
        return [
            'creador:id,name,email',
            'deporte:id,nombre',
            'instalacion:id,municipio_id,nombre,direccion',
            'instalacion.municipio:id,nombre',
            'jugadores:id,name,email',
        ];
    }

    private function syncPlayersCount(Partido $partido): void
    {
        $partido->jugadores_actuales = $partido->jugadores()
            ->wherePivot('estado', 'confirmado')
            ->count();

        $partido->save();
    }
}
