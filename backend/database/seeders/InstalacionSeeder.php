<?php

namespace Database\Seeders;

use App\Models\Instalacion;
use Illuminate\Database\Seeder;

class InstalacionSeeder extends Seeder
{

    public function run(): void
    {
        Instalacion::factory(5)->create();
    }
}
