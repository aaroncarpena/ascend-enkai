<?php

namespace Database\Seeders;

use App\Models\Deporte;
use App\Models\Modalidad;
use Illuminate\Database\Seeder;

class DeporteModalidadSeeder extends Seeder
{
    public function run(): void
    {
        // Crear modalidades
        $modalidades = [
            ['nombre' => 'Individual', 'descripcion' => 'Competencia de uno contra uno'],
            ['nombre' => 'Dobles', 'descripcion' => 'Competencia de dos contra dos'],
            ['nombre' => 'Equipos', 'descripcion' => 'Competencia por equipos'],
        ];

        foreach ($modalidades as $modalidad) {
            Modalidad::firstOrCreate(['nombre' => $modalidad['nombre']], $modalidad);
        }

        $individual = Modalidad::where('nombre', 'Individual')->first();
        $doble = Modalidad::where('nombre', 'Dobles')->first();
        $equipos = Modalidad::where('nombre', 'Equipos')->first();

        // Deportes con sus modalidades
        $deportes = [
            [
                'nombre' => 'Fútbol',
                'descripcion' => 'Deporte de equipo jugado entre dos equipos de once jugadores',
                'numJugadores' => 22,
                'modalidades' => [
                    ['id' => $equipos->id, 'min' => 10, 'max' => 22],
                ]
            ],
            [
                'nombre' => 'Tenis',
                'descripcion' => 'Deporte de raqueta jugado entre dos o cuatro jugadores',
                'numJugadores' => 4,
                'modalidades' => [
                    ['id' => $individual->id, 'min' => 2, 'max' => 2],
                    ['id' => $doble->id, 'min' => 4, 'max' => 4],
                ]
            ],
            [
                'nombre' => 'Pádel',
                'descripcion' => 'Deporte de raqueta similar al tenis jugado en una cancha cerrada',
                'numJugadores' => 4,
                'modalidades' => [
                    ['id' => $doble->id, 'min' => 4, 'max' => 4],
                ]
            ],
            [
                'nombre' => 'Baloncesto',
                'descripcion' => 'Deporte de equipo donde dos equipos intentan encestar un balón',
                'numJugadores' => 10,
                'modalidades' => [
                    ['id' => $equipos->id, 'min' => 5, 'max' => 12],
                ]
            ],
            [
                'nombre' => 'Voleibol',
                'descripcion' => 'Deporte de equipo donde dos equipos intentan pasar un balón sobre una red',
                'numJugadores' => 12,
                'modalidades' => [
                    ['id' => $equipos->id, 'min' => 6, 'max' => 14],
                ]
            ],
            [
                'nombre' => 'Bádminton',
                'descripcion' => 'Deporte de raqueta que se juega con un volante',
                'numJugadores' => 4,
                'modalidades' => [
                    ['id' => $individual->id, 'min' => 2, 'max' => 2],
                    ['id' => $doble->id, 'min' => 4, 'max' => 4],
                ]
            ],
            [
                'nombre' => 'Natación',
                'descripcion' => 'Deporte acuático de velocidad individual',
                'numJugadores' => 1,
                'modalidades' => [
                    ['id' => $individual->id, 'min' => 1, 'max' => 1],
                ]
            ],
            [
                'nombre' => 'Atletismo',
                'descripcion' => 'Conjunto de deportes que comprende pruebas de velocidad, resistencia y saltos',
                'numJugadores' => 1,
                'modalidades' => [
                    ['id' => $individual->id, 'min' => 1, 'max' => 1],
                ]
            ],
            [
                'nombre' => 'Rugby',
                'descripcion' => 'Deporte de equipo donde dos equipos compiten por un balón ovalado',
                'numJugadores' => 30,
                'modalidades' => [
                    ['id' => $equipos->id, 'min' => 15, 'max' => 30],
                ]
            ],
            [
                'nombre' => 'Golf',
                'descripcion' => 'Deporte individual o por parejas jugado en campo abierto',
                'numJugadores' => 4,
                'modalidades' => [
                    ['id' => $individual->id, 'min' => 1, 'max' => 1],
                    ['id' => $doble->id, 'min' => 2, 'max' => 2],
                ]
            ],
        ];

        foreach ($deportes as $deporte) {
            $modalidadesData = $deporte['modalidades'];
            unset($deporte['modalidades']);

            $deporteCreado = Deporte::firstOrCreate(
                ['nombre' => $deporte['nombre']],
                $deporte
            );

            foreach ($modalidadesData as $mod) {
                $deporteCreado->modalidades()->attach($mod['id'], [
                    'min_jugadores' => $mod['min'],
                    'max_jugadores' => $mod['max'],
                ]);
            }
        }
    }
}
