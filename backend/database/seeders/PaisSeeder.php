<?php

namespace Database\Seeders;

use App\Models\Provincia;
use Illuminate\Database\Seeder;
use App\Models\Pais;
class PaisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $paises = Pais::all();

        foreach ($paises as $pais) {
            Provincia::factory(3)->create(['pais_id' => $pais->id]);
        }
    }
}
