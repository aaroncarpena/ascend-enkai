<?php

namespace Database\Seeders;

use App\Models\Pais;
use App\Models\Provincia;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ProvinciaSeeder extends Seeder
{

    public function run(): void
    {
        if (! Storage::exists('provincias_espanya.csv')) {
            $pais = Pais::firstOrCreate(['nombre' => 'Espana']);

            foreach (['Madrid', 'Barcelona', 'Valencia'] as $nombre) {
                Provincia::firstOrCreate(
                    ['nombre' => $nombre],
                    ['pais_id' => $pais->id],
                );
            }

            return;
        }

        $fichero = fopen(Storage::path('provincias_espanya.csv'), 'r');
        while(($datos = fgetcsv($fichero)) !=null){
            Provincia::create([
                "nombre"=>$datos[0],
                "pais_id"=>$datos[1]
            ]);
        }
    }
}
