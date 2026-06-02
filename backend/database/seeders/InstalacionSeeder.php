<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Instalacion;
use App\Models\Municipio;

class InstalacionSeeder extends Seeder
{
    public function run(): void
    {
        $municipio = Municipio::firstOrCreate(
            ['codigo' => '28079'],
            ['nombre' => 'Madrid', 'provincia_id' => 1],
        );

        $instalaciones = [
            [
                'nombre' => 'Centro Deportivo Norte',
                'direccion' => 'Calle del Deporte 12, Madrid',
                'horario_apertura' => '08:00:00',
                'horario_clausura' => '22:00:00',
            ],
            [
                'nombre' => 'Polideportivo La Alameda',
                'direccion' => 'Avenida de la Alameda 45, Madrid',
                'horario_apertura' => '09:00:00',
                'horario_clausura' => '23:00:00',
            ],
            [
                'nombre' => 'Club Raqueta Central',
                'direccion' => 'Paseo de las Pistas 8, Madrid',
                'horario_apertura' => '07:30:00',
                'horario_clausura' => '21:30:00',
            ],
            [
                'nombre' => 'Piscina Municipal Sur',
                'direccion' => 'Calle Agua 21, Madrid',
                'horario_apertura' => '08:30:00',
                'horario_clausura' => '21:00:00',
            ],
            [
                'nombre' => 'Pabellon Deportivo Oeste',
                'direccion' => 'Ronda del Equipo 3, Madrid',
                'horario_apertura' => '10:00:00',
                'horario_clausura' => '22:30:00',
            ],
            [
                'nombre' => 'Campos Municipales Rio',
                'direccion' => 'Camino del Rio 18, Madrid',
                'horario_apertura' => '08:00:00',
                'horario_clausura' => '00:00:00',
            ],
        ];

        foreach ($instalaciones as $instalacion) {
            Instalacion::firstOrCreate(
                ['nombre' => $instalacion['nombre']],
                [
                    ...$instalacion,
                    'municipio_id' => $municipio->id,
                    'precio' => 0,
                ],
            );
        }
    }
}
