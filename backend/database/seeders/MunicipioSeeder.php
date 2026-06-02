<?php

namespace Database\Seeders;

use App\Models\Municipio;
use App\Models\Pais;
use App\Models\Provincia;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class MunicipioSeeder extends Seeder
{

    public function run(): void
    {
        if (! Storage::exists('municipios_espanya.csv')) {
            $pais = Pais::firstOrCreate(['nombre' => 'Espana']);
            $provincia = Provincia::firstOrCreate(
                ['nombre' => 'Madrid'],
                ['pais_id' => $pais->id],
            );

            $municipios = [
                ['codigo' => '28079', 'nombre' => 'Madrid'],
                ['codigo' => '28148', 'nombre' => 'Pozuelo de Alarcon'],
                ['codigo' => '28006', 'nombre' => 'Alcobendas'],
            ];

            foreach ($municipios as $municipio) {
                Municipio::firstOrCreate(
                    ['codigo' => $municipio['codigo']],
                    ['nombre' => $municipio['nombre'], 'provincia_id' => $provincia->id],
                );
            }

            return;
        }

        $fichero = fopen(Storage::path('municipios_espanya.csv'), 'r');
        while(($datos = fgetcsv($fichero)) !=null){

            Municipio::create([
                "codigo"=>$datos[0],
                "nombre"=>$datos[1],
                "provincia_id"=>$datos[2]
            ]);
        }
    }
}
