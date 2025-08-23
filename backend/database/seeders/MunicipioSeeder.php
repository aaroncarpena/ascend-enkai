<?php

namespace Database\Seeders;

use App\Models\Municipio;
use App\Models\Provincia;
use Illuminate\Database\Seeder;

class MunicipioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $provincias = Provincia::all();

        foreach ($provincias as $provincia) {
            Municipio::factory(3)->create(['provincia_id' => $provincia->id]);
        }
    }
}
