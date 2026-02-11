<?php

namespace Database\Seeders;

use App\Models\Municipio;
use App\Models\Provincia;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class MunicipioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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
