<?php

namespace Database\Seeders;

use App\Models\Provincia;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ProvinciaSeeder extends Seeder
{

    public function run(): void
    {
        $fichero = fopen(Storage::path('provincias_espanya.csv'), 'r');
        while(($datos = fgetcsv($fichero)) !=null){
            Provincia::create([
                "nombre"=>$datos[0],
                "pais_id"=>$datos[1]
            ]);
        }
    }
}
