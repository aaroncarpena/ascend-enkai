<?php

namespace Database\Seeders;

use App\Models\Deporte;
use App\Models\Instalacion;
use App\Models\Partido;
use App\Models\User;
use Illuminate\Database\Seeder;

class PartidoSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::take(10)->get();
        $deporte = Deporte::first();
        $instalaciones = Instalacion::take(3)->get();

        if ($users->isEmpty() || ! $deporte || $instalaciones->isEmpty()) {
            return;
        }

        $partidos = [
            [
                'instalacion_id' => $instalaciones[0]->id,
                'fecha' => now()->addDays(2)->toDateString(),
                'hora_inicio' => '18:00',
                'hora_fin' => '19:30',
                'max_jugadores' => 6,
                'jugadores_actuales' => 2,
                'nivel' => 'Intermedio',
                'descripcion' => 'Partido tranquilo para gente que quiera sumar ritmo.',
                'precio_por_jugador' => 5,
            ],
            [
                'instalacion_id' => $instalaciones[1]->id,
                'fecha' => now()->addDays(4)->toDateString(),
                'hora_inicio' => '20:00',
                'hora_fin' => '21:30',
                'max_jugadores' => 10,
                'jugadores_actuales' => 9,
                'nivel' => 'Principiante',
                'descripcion' => 'Partido casi completo para probar que desaparece cuando se llena.',
                'precio_por_jugador' => 3.5,
            ],
            [
                'instalacion_id' => $instalaciones[2]->id,
                'fecha' => now()->addWeek()->toDateString(),
                'hora_inicio' => '11:00',
                'hora_fin' => '12:30',
                'max_jugadores' => 4,
                'jugadores_actuales' => 1,
                'nivel' => 'Avanzado',
                'descripcion' => 'Ritmo alto y cambios rapidos.',
                'precio_por_jugador' => 7,
            ],
        ];

        foreach ($partidos as $index => $data) {
            $creator = $users[$index] ?? $users->first();

            $partido = Partido::updateOrCreate(
                [
                    'deporte_id' => $deporte->id,
                    'instalacion_id' => $data['instalacion_id'],
                    'fecha' => $data['fecha'],
                    'hora_inicio' => $data['hora_inicio'],
                ],
                [
                    ...$data,
                    'user_id' => $creator->id,
                    'deporte_id' => $deporte->id,
                    'estado' => 'pendiente',
                    'es_publico' => true,
                ],
            );

            $players = $users->take($partido->jugadores_actuales);
            $partido->jugadores()->sync(
                $players->mapWithKeys(fn ($player) => [
                    $player->id => [
                        'estado' => 'confirmado',
                        'unido_en' => now(),
                    ],
                ])->all(),
            );
        }
    }
}
