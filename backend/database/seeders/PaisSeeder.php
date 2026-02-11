<?php

namespace Database\Seeders;

use App\Models\Provincia;
use Illuminate\Database\Seeder;
use App\Models\Pais;
use Illuminate\Support\Facades\Storage;

class PaisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $fichero = fopen(Storage::path('paises.csv'), 'r');
        while(($datos = fgetcsv($fichero)) !=null){
            Pais::create([
                "nombre"=>$datos[0]
            ]);
        }
    }
}
