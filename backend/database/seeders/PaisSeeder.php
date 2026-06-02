<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pais;
use Illuminate\Support\Facades\Storage;

class PaisSeeder extends Seeder
{

    public function run(): void
    {
        if (! Storage::exists('paises.csv')) {
            Pais::firstOrCreate(['nombre' => 'Espana']);
            return;
        }

        $fichero = fopen(Storage::path('paises.csv'), 'r');
        while(($datos = fgetcsv($fichero)) !=null){
            Pais::create([
                "nombre"=>$datos[0]
            ]);
        }
    }
}
